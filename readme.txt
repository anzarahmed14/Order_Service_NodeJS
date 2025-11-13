npm init -y
npm install typescript ts-node @types/node --save-dev

typescript → compiler
ts-node → run TypeScript files directly
@types/node → Node.js type definitions

npx tsc --init
Recommended changes in tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  }
}
install Express

npm install express
npm install --save-dev @types/express

package.json
"scripts": {
  "dev": "ts-node src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}


npm run dev   # Run with ts-node
npm run build # Compile TS to JS (into dist/)
npm start     # Run compiled JS


Auto Start
npm install --save-dev nodemon
Inside your project root, create a file nodemon.json:
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node src/index.ts"
}

Update package.json Scripts
"scripts": {
  "dev": "nodemon",
  "build": "tsc",
  "start": "node dist/index.js"
}


Relation database
npm install typeorm reflect-metadata

npm install mssql

git install

git init
git remote add origin https://github.com/anzarahmed14/User_Service_NodeJS.git
git add .
git commit -m "msg"
git push -u origin main