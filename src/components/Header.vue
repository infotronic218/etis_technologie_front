<template>
          <div   class="container-fluid my-nav bg-dark ">
                  <div class="row justify-content-center  desktop-only">
                      <div class="col-sm mt-2 mx-1 p-1 ntec">
                       <div class="">   <img style="max-height: 100%; max-width: 100%;" src="/logo.png" alt=""></div>
                      </div>
                      <div class="col mt-2 mx-1 ntec p-1 ">
                            <h5 class="mx-3"><a class=" text-center text-white" href="tel:00212631053884" >
                                     <strong><span class="fas fa-phone"></span>
                                     <span> 00212631053884</span></strong>
                             </a></h5>
                             <h5 class="mx-3">
                                <a class=" text-center text-white" href="mailto:novatech226@gmail.com" >
                                     <strong><span class="fas fa-envelope"></span>
                                     <span class="px-1"> etistechnologie@gmail.com</span></strong>
                                </a>
                             </h5>
                      </div>
                      <div class="col mt-2 mx-1 ntec p-1 desktop-only">
                            <div class=" text-center text-uppercase">
                            <h1 ><strong class="text-primary">ETIS</strong>
                           <strong class="text-white">  Technologies</strong></h1>
                            <div class="row mx-4">
                               <a class="col text-white" href="https://www.facebook.com/ETIS-Technologies-444565246080858/" target="blank">
                               <span class="fab fa-facebook" style="font-size: 24px;"></span></a>
                               <a class="col text-white" href="https://www.facebook.com/ETIS-Technologies-444565246080858/" target="blank">
                                  <span class="fab fa-linkedin" style="font-size: 24px;"></span>
                                </a>
                                <a href="#" class="col text-white">
                                  <span class="fab fa-twitter" style="font-size: 24px;"></span>
                                </a>
                            </div>
                            </div>
                      </div>
                           
                  </div>
                 
                  <nav class="navbar navbar-expand-lg navbar-dark mobile-menu">
                    <a  class="navbar-brand text-primary   text-uppercase " href="/">
                     
                       <img class="mobile-only " style="max-width:130px;"  src="/logo.png" alt="">
                     
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                      Menu<span class="navbar-toggler-icon "></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                      <div class="navbar-nav align-items-center">
                       
                        <router-link class="m-2 mlink d-flex btn w-100 text-uppercase" exact-active-class="m-active" to="/"><span class="fas fa-home text-white mx-1"></span> <strong>Acceuil</strong></router-link>
                        <router-link class="m-2 mlink d-flex h5 w-100 btn text-uppercase" exact-active-class="m-active" to="/services"><span class="fas fa-briefcase text-white mx-1"></span><strong> Services</strong></router-link>
                        <router-link  hidden="hidden" class="m-2  mlink h5 btn w-100 text-uppercase " exact-active-class="m-active" to="/formations"><span class="fas fa-graduation-cap text-white mx-1"></span><strong>  Formations</strong></router-link>
                        <router-link class="m-2 mlink btn d-flex h5 w-100 text-uppercase" active-class="m-active" to="/blog"><span class="fas fa-project-diagram text-white mx-1"></span><strong> Blog</strong></router-link>
                        <router-link class="m-2 mlink btn d-flex h5 w-100 text-uppercase" exact-active-class="m-active" to="/contact"> <span class="fas fa-envelope text-white mx-1"></span><strong>  Contact</strong></router-link>
                        <router-link  v-if="this.$store.state.userIsAuthorized" class="m-2 mlink d-flex btn h5 w-100 text-uppercase" to="/settings"> <span class="fas fa-cogs text-white mx-1"></span><strong>  Settings</strong></router-link>
                        <a v-if="!this.$store.state.userIsAuthorized" exact-active-class="active" class="m-2 d-flex mlink btn h5 w-100 text-uppercase" @click.prevent="loginForm()"> <i class="fas fa-sign-in-alt text-white mx-1"></i><strong>  Login</strong></a>
                        <a v-if="this.$store.state.userIsAuthorized" exact-active-class="active" class="m-2 d-flex mlink btn h5 w-100 text-uppercase"  @click.prevent="logout()"> <span class="fas  fa-sign-out-alt text-white mx-1"></span><strong >  Logout</strong></a>
                        <router-link v-if="this.$store.state.userIsAuthorized" exact-active-class="active" to="/account" class="m-2 d-flex mlink btn h5 w-100 text-uppercase" > <span class="fas  fa-sign-out-alt text-white mx-1"></span><strong > Mon compte</strong> </router-link>
                      </div>
                    </div>
                  </nav>
               </div>
</template>


<style>


</style>
<script>
export default {
   methods: {
     loginForm(){
        $('#loginForm').modal('show')
     },

     logout(){
       window.Store.commit('logout')
       

     }
   },
   mounted() {
   
      
   },
}
</script>
<style>

    .mobile-only{
       display: none!important;
    }
       @media screen and (max-width: 600px) {
         .desktop-only{
           display: none! important;
         }

         .mobile-only{
           
           display:initial!important;

         }
         .main{
           margin-top: 70px;
         }
         .mobile-menu{
            position: fixed!important;
            top: 0;
            right: 0;
            left: 0;
            z-index: 1030;
            background-color: #332040!important;
         }
       }
    
    

</style>

