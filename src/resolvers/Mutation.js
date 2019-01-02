const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

async function signup(parent, args, ctx, info) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.mutation.createUser({
    data: {name: args.name, email: args.email,  password}
    })
    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        user,
        token
    }
}

async function login(parent, args, ctx, info) {
    const user = await ctx.db.user( { email: args.email } );
    if(!user) {
        throw new Error('no such user found')
    }
    const valid = await bcrypt.compare(args.password, user.password)
    if(!valid) {
        throw new Error('invalid password')
    }
    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        user,
        token
    }
}
function createDraft(parent, args, ctx, info) {
    const userId = getUserId(ctx)
    return ctx.db.mutation.createPost({
        title: args.title,
        content: args.content,
        postedBy: { connect: {id: userId }}
    }
    )
}
function deletePost(parent, {  id }, ctx, info) {
    return ctx.db.mutation.deletePost({  where:  { id } },  info)
}

function publish(parent,  {  id },  ctx, info) {
    return ctx.db.mutation.updatePost({
        where: { id },
        data: { published: true}
    }, info)
}

module.exports = {
    signup,
    login,
    createDraft,
    deletePost,
    publish
}