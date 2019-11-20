const express = require('express');
const server = express();


server.use(express.json())


const projects = [];
let requisitions = 0;

function checkProjectArray(req,res,next){

    const { id } = req.params
    const project = projects.find(p => p.id == id)

    if(!project){
        return res.status(400).json({erro: 'User project not exists'})
    }

    return next();
}

function numberRequisitions(req,res,next){
    requisitions++;
    console.log(`Number of requisitions: ${requisitions}`)

    return next();
}


//Retorna todos os projetos
server.get('/projects',numberRequisitions,(req,res)=>{
    return res.json(projects)
})

//Cadastra um projeto
server.post('/projects',numberRequisitions,(req,res)=>{
    const {id,title} = req.body;

    let object = {
        id,
        title,
        tasks: []
    }
    projects.push(object)
    return res.json(projects)

})

//Cadastra Tasks

server.post('/projects/:id/tasks',checkProjectArray,(req,res)=>{
    const {id} = req.params;
    const {title} = req.body;

    const project = projects.find(p => p.id == id);
    project.tasks.push(title);

    return res.json(project)
})

//Edita um projeto
server.put('/projects/:id',numberRequisitions,checkProjectArray,(req,res)=>{
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id == id)

    project.title = title;

    return res.json(project)

})

//Deleta um projeto
server.delete('/projects/:id',numberRequisitions,checkProjectArray,(req,res)=>{
    const {id} = req.params;

    const index = projects.findIndex(p => p.id == id)

    projects.splice(index,1);

    return res.send();
})

server.listen(3000);