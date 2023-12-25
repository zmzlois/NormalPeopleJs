
export const app = createNpContext(ctx);

export const np = createNpRoute({
    app: appRoute,
    product: productRoute,
})



export const userRoute = createNpMethod((opts, ctx) => ({
    getAll: getAllUserMethod(userId){
     const allUsers = await db.select().from(userTable).where(eq(userId, userid))
      return allUsers;
    },
    getById: getByIdMethod,
    deleteById: deleteByIDMethod,
}));

export const productRoute =...AbortController.
