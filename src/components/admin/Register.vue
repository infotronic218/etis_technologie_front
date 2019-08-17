<template>
    <div class="col-sm-9  mx-auto px-0 mb-3">
        <div class="card">
            <div class="card-header bg-dark">
               <h6 class="text-center text-white text-uppercase"><strong>Create account</strong></h6>
            </div>
            <div class="card-body">
             <div class="col-sm-12 px-0">
               
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
                       <label for="">Username</label>
                   </div>
                   <div class="col-sm-8">
                     <input type="text"  v-model="user.username" class="form-control" placeholder="Enter your username">
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
                   <div class="col-sm-12">
                      <label class="text-danger" v-if="error.password">{{error.password}}</label>
                   </div>
                   <div class="col-sm-4">
                       <label for="">Password</label>
                   </div>
                   <div class="col-sm-8">
                     <input type="password"  v-model="user.password" class="form-control" placeholder="Enter your password">
                   </div>
               </div>
                <div class="row mb-3">
                   <div class="col-sm-4">
                       <label for="">Password confirmation</label>
                   </div>
                   <div class="col-sm-8">
                     <input type="password" v-model="user.confirm" class="form-control" placeholder="Enter your password to confirm">
                   </div>
               </div>
               <div class="row mb-3">
                   <div class="col-sm-4">
                       <button @click.prevent="createUser()" class="btn btn-primary"><strong>Save</strong></button>
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
import Axios from 'axios';
export default {
     data(){
        return{
            user:{
                username:'',
                confirm:'',
                password:'',
                email:'',
                firstname:'',
                lastname:'',
            },
            error:Object,
            
        }
     },watch: {
         'user.confirm'(){
             if(this.user.password!=this.user.confirm){
                this.error.password = 'The two password must be the same'
             }else{
                 this.error.password = null;
             }
         },
         'user.username'(old, newU){
            console.log(old, newU)
             if(this.user.username.split("")){
                this.error.password = 'The two password must be the same'
             }else{
                 this.error.password = null;
             }
         },
          

         'user.password'(){
             if(this.user.confirm!="" && this.user.password!=this.user.confirm){
                this.error.password = 'The two password must be the same'
             }else{
                 this.error.password = null;
             }
         }, 
         
     },
     methods: {
         createUser(){
             console.log(this.user)
              var user = this.user
             Axios.post('/register', {
               username:this.user.username,
               email:this.user.email,
               password:this.user.password,
               firtname:this.user.firtname,
               lastname:this.user.lastname,
               confirm:this.user.confirm,
             }, {
                   'Content-Type':'application/json',
             }).then(function(data){
               console.log(data)
               if(data.success){
                   //user created you can now login
               }else{
                   //write error message
               }
             })
         }
     },
     
     metaInfo:{
       title:'User registration',
       meta : [
           {name:'description', content:'New user registration page '},
           {vmid: "description", name: "description", content: "description here"}
       ]
    },
    mounted() {
        $('#description').attr('content', 'New user registration page')
    },
}
</script>