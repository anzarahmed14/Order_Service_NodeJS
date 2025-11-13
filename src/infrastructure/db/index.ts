import "reflect-metadata";
import { DataSource } from "typeorm";
import { OrderEntity } from "./entities/OrderEntity";
import { OrderProductEntity } from "./entities/OrderProductEntity";

export const AppDataSource = new DataSource({
    type:"mssql",
    url:"mssql://sa:Test%402014@127.0.0.1:1433/demoprojectdb",
   // url: "mssql://sa:Test%402014@host.docker.internal:1433/demoprojectdb",
    synchronize: false,
    logging:true,
    entities:[OrderEntity,OrderProductEntity],
    options:{
        encrypt:false,
         trustServerCertificate: true
    }
})

