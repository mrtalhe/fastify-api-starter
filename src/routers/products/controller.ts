class ProductsController {
  async products(request: any, reply: any) {
    reply.send("products");
  }
}

export default new ProductsController();
