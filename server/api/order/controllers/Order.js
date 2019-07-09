'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/guides/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  create: async ctx => {
    // const data = await strapi.services.order.add(ctx.request.body);

    // ctx.created(); // Send 201 `created`

    // NEW LINE: call our method emitToAllUsers and pass it body request
    strapi.emitToAllUsers(ctx.request.body);
  }
};
