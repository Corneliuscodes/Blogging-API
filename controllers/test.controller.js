const models = require(`../models`);

async function test(req, res){

    //One to one - 1:1 -- User can have one address or address belongs to one user
    //one to many - 1:m -- a user has many post written by him
    //many to many -- m:m -- a post belongs to many categories

    //One to one

    // const user = await models.User.findByPk(10, {
    //     include:[models.Address]
    // })

    // const address = await models.Address.findByPk(1, {
    //     include: [models.User]
    // })

    // //One to many
    // const user = await models.user.findByPk(10, {
    //         include: [models.post]
    //     })

    // many to many relationships
    const post = await models.post.findByPk(18,{
                include: [models.Categories]
            });
    const category = await models.Category.findByPk(1,{
                include: [models.post]
            });

    res.status(200).json({
        data:post
    })
}



module.exports = {
    test:test
}