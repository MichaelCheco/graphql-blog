
async function posts(parent, args, ctx, info) {
    const data = await ctx.db.query.posts({}, info)
    return data
}

async function post(parent, args, ctx, info) {
    const data = await ctx.db.query.post({ where: {id: args.id } }, info)
    return data
}

module.exports = {
    posts,
    post
}