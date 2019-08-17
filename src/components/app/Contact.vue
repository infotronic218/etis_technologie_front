<template>
    <div id="contact">
      <!-- Situation geographique -->
       <div class="row  mb-3">
         <div class="col-12 ">
           <div class="card p-2 bg-dark mshadow">
             <div class="p-2 bg-dark">
                <h6 class="text-center text-uppercase text-white"><strong>Notre situation géographique</strong></h6>
             </div>
             <div class="card-body bg-white justify-content-center">
                <p class=" px-0">
                 ETIS Technologies est située à Ouagadougou. Pour plus d'information vous pouvez prendre contact avec notre équipe avec les adresses suivantes.
                </p>
                <div class="row justify-content-center">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d593336.2391377392!2d-2.0565225757011554!3d12.320878802598644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xe2e95ecceaa44cd%3A0x799f67799c743b8b!2sOuagadougou%2C+Burkina+Faso!5e0!3m2!1sfr!2sma!4v1536453257302" frameborder="0" style="border:0; width: 100%; min-height: 350px;" allowfullscreen=""></iframe>
                </div>
               
             </div>
           </div>
         </div>
       </div>
       <!-- Envoyer un message -->
       <div class="row  mb-3">
         <div class="col-12">
           <div class="card p-2 bg-dark mshadow">
             <div class="p-2 bg-dark">
                <h6 class="text-center text-uppercase text-white"><strong> Nous envoyer un message</strong></h6>
             </div>
             <div class="card-body px-0 bg-white justify-content-center">
                <form action="#" @submit.prevent="send"  class="container-fluid">
                <div class="row mb-2" >
                   <div class="col-sm-12">
                       
                        <div v-if="info" class="alert alert-info" role="alert">
                           <h6 class="alert-heading text-center"> Sending to the server !</h6>
                           <p  class=" text-center px-4">Please wait we are sending your message to the admin!</p>
                        </div>
                        
                        <div v-if="success" class="alert alert-success" role="alert">
                          <h6 class="alert-heading text-center">Done !</h6>
                         <p  class="text-center px-4">Your message has been  successfully send to the admin. They will reply to your message in a short time. 
                          Thank for visiting our web site!</p>
                        </div>
                        <div v-if="error" class="alert alert-danger" role="alert">
                           <h6 class="alert-heading text-center"> Error !</h6>
                          <p  class="r text-center px-4">Please check your data and try again. Make sure that you fill properly informations.</p>
                        </div>
                       
                   </div>
                </div>
                <div class="row mb-2">
                   <div class="col-sm-3">
                     <label>Nom et prénom</label>
                   </div>
                   <div class="col-sm-9">
                    <input class="form-control" type="text" v-model="message.author"  required="required" placeholder="Entrez votre nom et prénom">
                   </div>
                </div>
                
                <div class="row mb-2">
                   <div class="col-sm-3">
                     <label>Email</label>
                   </div>
                   <div class="col-sm-9">
                    <input class="form-control" type="email" v-model="message.email"  required="required" placeholder="Entrez votre adresse email">
                   </div>
                </div>
                
                <div class="row mb-2">
                   <div class="col-sm-3">
                     <label>Titre</label>
                   </div>
                   <div class="col-sm-9">
                    <input class="form-control" type="text" v-model="message.title"  required="required" placeholder="Entrez le titre de votre message">
                   </div>
                </div>
                
                <div class="row mb-2">
                   <div class="col-sm-3">
                     <label>Votre message</label>
                   </div>
                   <div class="col-sm-9">
                    <textarea class="form-control" v-model="message.body"  required="required" placeholder="Entrez le contenu de votre message" rows="5"></textarea>
                   </div>
                </div>
                <div class="row mb-2">
                   <div class="col-sm-3">
                     <button type="submit"  class="btn btn-danger">Envoyer</button>
                   </div>
                   <div class="col-sm-9">
                   </div>
                </div>
                </form>
             </div>
           </div>
         </div>
       </div>
       <!-- Social media -->
        <div class="row  mb-3" hidden="hidden">
         <div class="col-12">
           <div class="card p-2 bg-dark mshadow">
             <div class="p-2 bg-dark">
                <h6 class="text-center text-uppercase text-white"><strong> Nous joindre sur les réseaux sociaux</strong></h6>
             </div>
             <div class="card-body bg-white justify-content-center">
                 <div class="row">
                   <div class="col">
                     <a href="https://www.facebook.com/ETIS-Technologies-444565246080858/" target="blank">
                      <span class="fab fa-facebook" style="font-size: 30px;"></span>
                      <br>
                      <label>Facebook</label>
                     </a>
                   </div>
                   
                    <div class="col">
                     <a href="http://www.facebook.com/NovaTech226">
                      <span class="fab fa-linkedin" style="font-size: 30px;"></span>
                      <br>
                      <label>LinkdIn</label>
                     </a>
                   </div>
                   
                   <div class="col">
                     <a href="#">
                      <span class="fab fa-twitter" style="font-size: 30px;"></span>
                      <br>
                      <label>Twitter</label>
                     </a>
                   </div>
                 </div>
             </div>
           </div>
         </div>
       </div>

     </div>
</template>
<<script>
import   axios from 'axios'
export default {
  data() {
    return {
      message:{
         email:'',
         author:'',
         title:'',
         body:'',
      },
      info:false, 
      error:false, 
      success:false, 
    }
  },
  metaInfo:{
    title:'Nous contacter'
  },
  methods: {
     send:function(e){
        bootbox.confirm("Do you want to send this message ?",  (state)=> {
          if(state){
            this.info = true
            this.error = false
            axios.post('/api/contact/message', 
               {
                 author:this.message.author,
                 email:this.message.email,
                 body:this.message.body,
                 title:this.message.title

               } 
            ,{
             'Content-Type':'application/json',
            }).then((data)=>{
                if(data.data){
                    bootbox.alert("Message send succesfully !"),
                    this.info = false
                    this.error = false
                    this.success = true
                    this.message = {

                    }
                }
                 
                 else 
                 bootbox.alert("An error occur when sending the data!")
            }).catch((error)=>{
              this.info = false
              this.error = true
               bootbox.alert("An error occured when sending message . Check your message and try again! ")
            })
          }
       })
      
       
     }
  },
}
</script>