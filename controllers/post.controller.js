const validator = require(`fastest-validator`);
const models = require(`../models`)
//method to save new post insert data
function save(req, res){
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
        userId: req.userData.userId
    }

    console.log(req.userData)
    //validation schema
    const schema = {
         title: {type:"string", optional: false, max:"100"},
         content: {type: "string", optional: false, max:"500"},
         categoryId:  {type: "number", optional: false},
    }

    //create new instance of validator class
    const v = new validator()
    const validateResponse = v.validate(post,schema);

    if(validateResponse !== true){
        return res.status(400).json({
            message:"validation failed",
            errors: validateResponse
        })
    }

    models.Category.findByPk(req.body.category_id).then(result => {
        if(result !== null) {
            models.post.create(post).then((result)=>{
                res.status(201).json({
                    message: "post created successfully",
                    post: result
                });
            }).catch((error) => {
                res.status(500).json({
                    message: "something went wrong",
                    error: error
                });
            }); 
        }else{
            res.status(400).json({
                message: "category not found"
            })
        }
    })
}

//method to get a single blog post
function show(req, res){
    const{id}=req.params;

    models.post.findByPk(id, {
        include:[models.user]  
    }).then((result) =>{
        if(result){
            res.status(200).json(result)
        }else{
            res.status(500).json({
                message:"something went wrong!"
            })
        }
    }).catch((error)=>{
        res.status(500).json({
            message:"something went wrong!"
        })
    })
}

//method to get all the post
function index(req, res){
    models.post.findAll().then((result)=>{
        res.status(200).json(result);
    }).catch(error =>{
        res.status(500).json({
            message:"something wrong"
        })
    })
}

//method for updating post
function update(req, res){
    const{id}=req.params;
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
    }
    const userId = req.userData.userId;

    //validation schema
    const schema = {
        title: {type:"string", optional: false, max:"100"},
        content: {type: "string", optional: false, max:"500"},
        categoryId:  {type: "number", optional: false},
   }

   //create new instance of validator class
   const v = new validator()
   const validateResponse = v.validate(updatedPost,schema);

   models.Category.findByPk(req.body.category_id).then(result => {
    if(result !== null) {
        models.post.update(updatedPost,{where: {id:id, userId:userId}}).then(result=>{
        res.status(200).json({
            message:"post updated successfully",
            post: updatedPost
        })
    }).catch(error=>{
        res.status(200).json({
            message:"Something went wrong",
            error: error
        })
    })
    }else{
        res.status(400).json({
            message: "category not found"
        })
    }
})

}

//method for deleting post
function destroy(req, res){
    const{id}=req.params;
    const userId = req.userData.userId;

    models.post.destroy({where: {id:id, userId:userId}}).then(result=>{
        res.status(201).json({
            message:"post deleted successfully",
            post: result
        })
    }).catch(error=>{
        res.status(500).json({
            message:"Something went wrong",
            error: error
        })
    })
}



module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy
}