<template>
     <div class="container">
         
         <div class="modal fade" id="loginForm" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
             <div class="modal-dialog" role="document">
                 <div class="modal-content bg-dark p-0 m-0">
                    <div class="col-sm-12 my-3">
                        <div class="card bg-dark">
                            <div class="card-header bg-dark">
                                <h5 class="text-uppercase text-center text-white"><strong>Authentification</strong></h5>
                            </div>
                            <div class="card-body bg-white">
                                <form class="col-sm-12">
                                    <div class="row mb-3">
                                        <label v-if="error"  class="label-form-control text-danger"><strong v-text="message">Error in the form please check your form</strong></label>
                                        <input type="email" v-model="email" class="form-control" placeholder="Enter your username">
                                    </div>
                                    <div class="row mb-3">
                                        <input autocomplete="" type="password" v-model="password" class="form-control" placeholder="Enter your password">
                                    </div>
                                    <div class="row mb-3">
                                        <button @click.prevent="login()" class="btn btn-primary "><strong>Login</strong></button>
                                    </div>
                                </form>
                            </div>
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
        return {
            email:null,
            password:null,
            error:false,
            message:'',
        }
    },
    methods:{
        login(){
            this.error = false;
            this.message=""
             axios.post('/api/login',{
                 username:this.email,
                 password:this.password,
             },{
                 headers:{
                     'Content-Type':'application/json'
                 }
             }).then(data=>{
                 var authorization = data.headers.authorization
                 var expiration  = data.headers.expiration
    
                 window.Store.commit('setAuthorization',{
                     authorization:authorization,
                     expiration: expiration
                 })
                 this.email =""
                 this.password=""
                 $('#loginForm').modal('hide')
                 bootbox.alert('<p class="text-success"><strong>You have succesfully Login !</strong></p>')
             }).catch(error=>{
                 this.message="Error ! Please check your credentials and try again."
                 this.error = true 
                 
                 
             })
        }
    }
}
</script>