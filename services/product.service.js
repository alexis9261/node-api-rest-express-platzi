const faker = require('faker')
const boom = require('@hapi/boom')

class ProductService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100

    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      })

    }
  }

  async create(data) {

    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }

    this.products.push(newProduct);

    return newProduct;
  }

  async find() {
    return this.products;
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('this id dont exists')
    }
    if (product.isBlock) {
      throw boom.conflict('product is block')
    }
    return product;
  }

  async update(id, data) {
    // Busacr si el id existe en el array
    if ( !this.products.some((product) => product.id === id) ) {
      throw boom.notFound('this id dont exists')
    }

    const index = await this.products.findIndex( item => (item.id === id) );
    const product = this.products[index];

    this.products[index] = {
      ...product,
      ...data
    };

    return this.products[index];
  }

  async delete(id) {

    if ( !this.products.some((product) => product.id === id) ) {
      throw boom.notFound('this id don\'t exists')
    }

    const index = this.products.findIndex( item => (item.id === id) );

    this.products.splice(index, 1);

    return {
      message: 'deleted',
      id,
    };

  }


}

module.exports = ProductService
