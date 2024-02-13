export default eventHandler(() => {
  // return 'hello nuxt3';
  // return {
  //   message: 'hello nuxt3',
  // };
  throw createError({
    statusCode: 404,
    statusMessage: 'page not found',
  });
});
