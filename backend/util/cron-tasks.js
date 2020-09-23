const Task = require("../models/Task");

module.exports = {

    async function1() {
        console.log("func1")
        const today = new Date();
        const filter = {estado: "Creada"}
        const cursor = Task.find(filter).cursor()
        try{
            for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
                const date = new Date(doc.fecha_inicial_tent)
                console.log("doc1: "+ date)
                console.log("today1: "+ today)
                console.log("-- ",date >= today)
                console.log("")
                if(date >= today) {
                    Task.findByIdAndUpdate(doc._id,{estado: "Por ejecutar"}, (err, docs) => {
                        if (err){ 
                            console.log(err) 
                        } 
                        else{ 
                            console.log("Updated Task: ", docs); 
                        } 
                    })
                    console.log("--------------- Creada a Por ejecutar")
                    console.log("")
                }
            }
        } catch (error){
            console.log(error)
        }
    },
    async function2(){
        console.log("func2")
        const today = new Date();
        const cursor = Task.find().cursor();
        try{
            for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
                const date = new Date(doc.fecha_final_tent)
                console.log("doc2: "+ date)
                console.log("today2: "+ today)
                console.log("-- ", date <= today)
                console.log("")
                if(doc.estado != "Cerrada" && date <= today) {
                    Task.findByIdAndUpdate(doc._id,{estado: "Vencida"}, (err, docs) => {
                        if (err){ 
                            console.log(err) 
                        } 
                        else{ 
                            console.log("Updated Task 2: ", docs); 
                        } 
                    })
                    console.log("--------------- Cualquiera a Vencida")
                    console.log("")
                }
            }
        } catch (error) {
        console.log(error)
        }
    }
}