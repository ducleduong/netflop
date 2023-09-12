<h1 align="center">
  <a
    target="_blank"
    href="https://mage.ai"
  >
    <img
      align="center"
      alt="Mage"
      src="https://github.com/ducleduong/netflop/blob/master/public/images/banner.png?raw=true"
      style="width:100%; margin-bottom: 10px;"
    />
  </a>
  <img
      align="center"
      alt="Mage"
      src="https://github.com/ducleduong/netflop/blob/master/public/images/logo-netflop.png?raw=true"
      style="width:100%; margin-bottom: 10px;"
    />
<h2 align="center">A Netflix Clone App</h2>
</h1>

## Getting Started

Create `.env` file as following:

```bash
DATABASE_URL=<your database connect string>
NEXTAUTH_JWT_SECRET=<your-next-jwt-secret>
NEXTAUTH_SECRET=<your-next-secret>
```

Run follwowing commands:

```bash
//Install packages
yarn install

//Start seed database
yarn db:seed

//Run development
yarn dev
```
