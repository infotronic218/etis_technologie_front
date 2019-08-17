<template>
    <div class="container-fluid">
        <div class="row mt-3">
            <div class="col-sm-8 ">
                <transition name="page1" mode="out-in">
                  <router-view />
              </transition>
           </div>
           <div class="col-sm-4" >
               <div v-if="categoriesPosts" class="card mb-3 p-2 mshadow bg-dark">
                   <div class="p-2 bg-dark">
                       <h6 class="text-center text-white text-uppercase"><strong>Notre blog</strong></h6>
                   </div>
                   <div class="card-body bg-white">
                     <div class="col-sm-12">
                     <div class="row mb-3" v-for="catp in categoriesPosts" v-bind:key="catp.name" >
                       <router-link class="text-uppercase" :to="$router.resolve('/blog/category/'+catp.name).href"><strong>{{catp.name}}</strong></router-link>
                                <span class="badge badge-primary px-2 m-1"> {{catp.count}}</span>
                     </div>
                     </div>
                   </div>
               </div>

               <div class="card  mb-3 p-2 mshadow bg-dark">
						<div class="p-2 bg-dark">
							 <h6 class="text-center text-uppercase text-white"><strong>Nous Contacter</strong></h6>
						</div>
						
						<div class="card-body bg-white">
							<div class="row">
								 <div class="col mb-2">
                                    <h6 class=""> 
                                    <a href="tel:00212631053884">
                                    <strong> <span class="fas fa-phone"></span>
                                      <span> 00212631053884</span>
                                    </strong>
                                    </a>
                                    </h6>
                                   
								 </div>
								 
								  <div class="col-12 mb-2">
                                    <h6 class=""> 
                                    <a href="mailto:etistechnologie@gmail.com">
                                    <strong><span class="fas fa-envelope"> </span> etistechnologie@gmail.com</strong>
                                    </a>
                                    </h6>
								 </div>
								 
								 <div class="col mb-2">
                                    <strong>
                                        <a class="" target="blank" href="https://www.facebook.com/ETIS-Technologies-444565246080858/"> <span class="fab fa-facebook"> </span> Page facebook</a>
                                    </strong>
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
        return{
             categoriesPosts:null,
        }
    },
    mounted(){
        axios.get('/api/pcategories').then((data)=>{
            this.categoriesPosts = data.data
        })
    }

}

</script>