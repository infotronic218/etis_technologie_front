<template>
    <div id="home"  class="container-fluid">
       <div class="row mb-2">
           
           <div class="col-12 bg-dark p-0 m-0">
             <div class="card w-100 bg-dark p-0">
                <div class="card-body m-0 p-1">
                    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
						  <ol class="carousel-indicators">
						    <li data-target="#carouselExampleIndicators" data-slide-to="0" class=""></li>
						    <li data-target="#carouselExampleIndicators" data-slide-to="1" class=""></li>
						    <li data-target="#carouselExampleIndicators" data-slide-to="2" class="active"></li>
						   <!-- <li hidden="" data-target="#carouselExampleIndicators" data-slide-to="1"></li>
						    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
						     --> 
						  </ol>
						  <div class="carousel-inner">
						    
						    <div class="carousel-item">
						      <img class="d-block w-100" style="width: 100%; height: auto;" src="@/assets/carousel/etis_technologies.png" alt="First slide">
						    </div>
						    
						    <div class="carousel-item active carousel-item-left">
						      <img class="d-block w-100" style="width: 100%; height: auto;" src="@/assets/carousel/notre_equipe.png" alt="Second slide">
						    </div>
						    
						    <div class="carousel-item carousel-item-next carousel-item-left">
						      <img class="d-block w-100" style="width: 100%; height: auto;" src="@/assets/carousel/notre_mission.png" alt="Second slide">
						    </div>
						    
						  </div>
						  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
						    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
						    <span class="sr-only">Previous</span>
						  </a>
						  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
						    <span class="carousel-control-next-icon" aria-hidden="true"></span>
						    <span class="sr-only">Next</span>
						  </a>
					</div>
                    
                </div>
               
             </div>
             
           </div>
          
         </div>
       <div  class="row mb-3 aos-init aos-animate">
         <div class="card mshadow bg-dark py-3  px-2 ">
                <div class="row justify-content-center">
                         <div class="col-sm-6">
                          <img alt="etis images error" src="@/assets/imgs/etis.png" class="mimg">
                         </div>
                        <div class="col-sm-6 p-2">
                           <div class="container">
                            <p class="f20  text-center py-2 text-white">
                            <strong>ETIS Technologies est une entreprise spécialisée
                             dans le domaine de la technologie pour vous accompagner 
                            dans l'automatisation, l'installation et la maintenance de 
                            vos systèmes industriels.</strong></p>
                           </div>
                        </div>
                       
                </div>
                 <div class="card-footer  bg-warning">
                       <h6 class=" px-6 text-center text-uppercase"> Avec ETIS Technologies soyez au point de la technologie dans vos activités.</h6>
                </div>
         </div>
       </div>

       <div data-aos="zoom-in-up" class="row mb-3 aos-init aos-animate">
        <div class="card mshadow py-3 px-2 bg-dark">
            <div class="row justify-content-center">
                <div class=" col-sm-6 text-center my-3 px-2">
                       <img alt="services image error"  src="@/assets/imgs/services.png" class="col-img">
                       
                </div>
                <div class="col-sm-6">
                        
                        <p class="f20 text-center text-white my-3"><strong>
                        Pour mieux répondre à vos exigences, Nous offrons une variété de services à&nbsp; 
                        nos clients, et Nous proposons des solutions complètes et
                         fiables couvrant tous les besoins.</strong></p>
                </div>
               
            </div>
             <router-link class="btn btn-primary w-100 text-uppercase p-3" to="/services"><strong>Nos Services</strong></router-link>
        </div>
      </div>
      
      

      <div data-aos="zoom-in-up" class="row mb-3 aos-init aos-animate">
        <div class="card py-3 mshadow  px-2 bg-dark">
            <div class="row justify-content-center my-3">
                <div class="col-sm-6 text-center">
                          <img alt="formations" style="max-width: 100%; height: auto;"  src="@/assets/imgs/training.png">
                </div>
                <div class="col-sm-6">
                       
                        <p class="f20 text-center text-white">
                        <strong>Le développement de vos activités s'accompagne
                         par une bonne formation de vos travailleurs. 
                        Nos offrons des formations pensées et concu pour vous dans plusieurs domaines du secteur industriel.</strong></p>
                </div>
                
            </div>
            
             <router-link class=" btn btn-primary w-100 text-uppercase p-3" to="#"><strong>Nos Formations</strong></router-link>
                       
        </div>
      </div>
                  
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    
    mounted(){
        $('.carousel').carousel({
         interval: 3000
      })
    },
    metaInfo(){
      return{
           title: 'ETIS Technologies',
           meta:[
             {name:'description', content:'Etis Technologies est entreprise offrant des services dans le domaine électrique, électronique et informatique.'}
           ]
           
      }
    },
}
</script>
<style>
     .f20{
       font-family:'consolas';
       font-size: 18px;
     }
     .col-img{
       height: auto;
       width: auto;
     }
</style>
