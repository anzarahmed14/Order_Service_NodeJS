import { Order } from "../../domain/entities/Order";
import { OrderEntity } from "../db/entities/OrderEntity";
import { OrderProductEntity } from "../db/entities/OrderProductEntity";

export class OrderMapper {
  /**
   * Convert DB entity -> domain model
   */
  static toDomain(entity: OrderEntity): Order {
    const orderProductsDomain = (entity.orderProducts || []).map((op) => ({
      orderProductId: op.orderProductId,
      // orderId is taken from the parent order (JoinColumn creates the FK in DB)
      orderId: entity.orderId,
      productId: op.productId,
      quantity: op.quantity,
      rate: op.rate,
      total: op.total,
      isActive: op.isActive,
      createdAt: (op as any).createdAt, // if you have timestamps on order products
      updatedAt: (op as any).updatedAt,
    }));

    const order: Order = {
      orderId: entity.orderId,
      orderDate: entity.orderDate,
      orderNo: entity.orderNo,
      userId: entity.userId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,

      // primary (new) shape: array of products
      orderProducts: orderProductsDomain,

      // backward-compatibility: single orderProduct (first item) if consumer expects it
      orderProduct: orderProductsDomain.length > 0 ? orderProductsDomain[0] : undefined,
    } as unknown as Order; // cast if your domain type doesn't declare both props

    return order;
  }

  /**
   * Convert domain model -> DB entity
   * Supports domain.orderProducts[] or domain.orderProduct (single) for convenience.
   */
  static toEntity(domain: Order): OrderEntity {
    const entity = new OrderEntity();

    if (domain.orderId) {
      entity.orderId = domain.orderId;
    }

    entity.orderNo = domain.orderNo;
    entity.orderDate = domain.orderDate;
    entity.userId = domain.userId;

    // Normalize domain input: accept either orderProducts (array) or orderProduct (single)
    const domainProducts = (domain as any).orderProducts ?? ((domain as any).orderProduct ? [(domain as any).orderProduct] : []);

    entity.orderProducts = (domainProducts || []).map((dp: any) => {
      const opEntity = new OrderProductEntity();

      if (dp.orderProductId) {
        opEntity.orderProductId = dp.orderProductId;
      }

      // set simple fields
      opEntity.productId = dp.productId ?? "";
      opEntity.quantity = dp.quantity ?? 0;
      opEntity.rate = dp.rate ?? 0;
      opEntity.total = dp.total ?? (opEntity.rate * opEntity.quantity);
      opEntity.isActive = typeof dp.isActive === "boolean" ? dp.isActive : true;

      // link back to parent entity so TypeORM sets FK (JoinColumn) correctly
      opEntity.order = entity;

      return opEntity;
    });

  // entity.createdAt = domain.createdAt ?? entity.createdAt;
    //entity.updatedAt = domain.updatedAt ?? entity.updatedAt;

    return entity;
  }
}