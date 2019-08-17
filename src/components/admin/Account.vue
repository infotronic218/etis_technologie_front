<template>
    <div class="col-sm-6 mx-auto my-3">
        <div class="card">
            <div class="card-header bg-dark">
               <h6 class="text-center text-white text-uppercase"><strong>My account</strong></h6>
            </div>
            <div class="card-body">
             <div class="col-sm-12">
               <div class="row mb-3">
                   <div class="col-sm-4">
                       <label for="">Username</label>
                   </div>
                   <div class="col-sm-8">
                     <input type="text" disabled="disabled" v-model="user.username" class="form-control" placeholder="Enter your username">
                   </div>
               </div>
                <div class="row mb-3">
                   <div class="col-sm-4">
                       <label for="">Email</label>
                   </div>
                   <div class="col-sm-8">
                     <input type="text" v-model="user.email" class="form-control" placeholder="Enter your Email">
                   </div>
               </div>
                <div class="row mb-3">
                   <div class="col-sm-4">
                       <label for="">Lastname</label>
                   </div>
                   <div class="col-sm-8">
                     <input type="text" v-model="user.lastname" class="form-control" placeholder="Enter your lastname">
                   </div>
               </div>
                <div class="row mb-3">
                   <div class="col-sm-4">
                       <label for="">Firstname</label>
                   </div>
                   <div class="col-sm-8">
                     <input type="text"  v-model="user.firstname" class="form-control" placeholder="Enter your firstname">
                   </div>
               </div>
               <div class="row mb-3">
                   <div class="col-sm-4">
                       <button @click.prevent="updateUser()" class="btn btn-primary"><strong>Save</strong></button>
                   </div>
                   <div class="col-sm-8">
                     
                   </div>
               </div>
               </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            user:Object,
            headers:{
                headers:{
                   'Content-Type':'application/json',
                   'Authorization':'Bearer '+window.Store.state.authorization
               }
            }
        }
    },
    methods:{
       getUser(){
         axios.get("/api/users/account",this.headers).then(data=>{
              this.user = data.data.user
         }).catch(error=>{
           
         })
       },
       updateUser(){
           bootbox.confirm("Do you want to save the changes ?",state=>{
                if(state){
                        axios.post('/api/users/account/update',{
                            firstname:this.user.firstname,
                            lastname :this.user.lastname,
                            email     :this.user.email,
                        }, this.headers).then(data=>{
                            bootbox.alert("Your account have been updated succesfully")
                        }).catch(error=>{
                            bootbox.alert("An error occur when updating the your Account")
                        })
                }
             })
       }
    },
    mounted(){
        this.getUser()
    }
}
</script>