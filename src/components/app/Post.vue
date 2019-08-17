<template>
  
    <div id="post" class="row justify-content-center">
        <div class="col-sm-12">
            <div   class="card mb-3">
                    <div class="card-header bg-dark">
                    <h6 class="text-center mx-1 text-uppercase text-white" ><strong >Details de l'article</strong></h6>
                    </div>
                    <div class="card-body">
                        <div class="col-sm-12 " v-if="post">
                              <h6 class="text-center text-uppercase text-primary"><strong v-html="post.title"></strong></h6>
                               <section  v-html="post.content"></section>
                        </div>
                    </div>
                    <div class="card-footer bg-dark">
                        <router-link  to="/blog"><button class="btn btn-primary">Retourner à la liste</button></router-link>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import loadScript from 'vue-plugin-load-script';
import Vue from 'vue'
Vue.use(loadScript)
import { Promise } from 'q';
export default {
    data(){
        return{
           slug:this.$route.params.slug,
           post:null
        }
    }, 
    metaInfo:{
      title:"Article detail"
    },
    methods:{
        fetch(okked){
            console.log(this.slug)
            axios.get("/api/posts/"+this.slug).then(data=>{
            this.post = data.data
            okked()
            }).catch(error=>{
                console.log(error)
            })
        }
    },
    mounted(){
       var postString = window.localStorage.getItem('post')
       if(postString){
           this.post = JSON.parse(postString)
           window.localStorage.removeItem('post')
           document.title = this.post.title
        }
        if(!this.post){
            let $this = this
          this.fetch(function(){
              document.title=$this.post.title
             Vue.loadScript('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/highlight.min.js').then(()=>{
              document.querySelectorAll('pre code').forEach((block) => {
               hljs.highlightBlock(block);
              });
             })
          })
        }
       Vue.loadScript('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/highlight.min.js').then(()=>{
          document.querySelectorAll('pre code').forEach((block) => {
              hljs.highlightBlock(block);
           });
       })
      
    
    },
    
    updated(){
        document.title = this.post.title
    }
}
</script>
<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/styles/darcula.min.css');
    .mcont{
           overflow:scroll;
    }
</style>
