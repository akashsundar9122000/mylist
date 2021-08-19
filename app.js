const express=require('express');
const app=express();
app.use(express.urlencoded({extended:true}));
const mongoose = require('mongoose');
const Item=require('./models/items');
const mongodb='mongodb+srv://akash:akashsundar@cluster0.8pp1q.mongodb.net/items-database?retryWrites=true&w=majority'
mongoose.connect(mongodb,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
    console.log('Connected')
    app.listen(3000);
}).catch(err=>console.log(err))
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.redirect('./get-items')
    res.render('index',{item})
})
app.get('/get-items',(req,res)=>{
    Item.find().then(result=>{
        res.render('index',{item:result})
    }).catch(err=>console.log(err))
})

app.get('/add-item',(req,res)=>{
    res.render('add-item')
})

app.post('/items',(req,res)=>{
    const item=Item(req.body);
    item.save().then(()=>{
        res.redirect('./get-items')
    }).catch(err=>console.log(err))
    console.log(req.body);
})

app.get('/items/:id',(req,res)=>{
    const id=req.params.id;
    Item.findById(id).then(result=>{
        console.log(result);
        res.render('./item-detail',{item:result})
    })
})
app.delete('/items/:id',(req,res)=>{
    const id=req.params.id;
    Item.findByIdAndDelete(id).then(result=>{
        res.json({redirect:'/'})
    })
})

app.put('/items/:id',(req,res)=>{
    const id=req.params.id;
    Item.findByIdAndUpdate(id,req.body).then(result=>{
        res.json({msg:'Updated Successfully!!!'})
    })
})

app.use((req,res)=>{
    res.render('404')

})