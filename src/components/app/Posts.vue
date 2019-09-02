<template>
    <div id="posts"  class="row justify-content-center">
        <div  class="col-sm-12 ">
            <div class="card mb-3 p-2 mshadow  bg-dark">
                <div class="p-2">
                     <h6 class="text-center  text-uppercase text-white"><strong>Liste de nos articles</strong></h6>
                </div>
                <div class="card-body p-0  bg-white"  v-if="posts.length>0">
                    <div class="col-sm-12 py-0">
                        <div class="row ">
                            <template v-for="(post,index) in posts" >
                                <div  class="mt-2 col-sm-6 mb-3 " v-bind:key="index">
                                    <div class="card mt-2 h-100">
                                        <router-link class="card-image-top"    :to="{path:'/blog/'+post.slug, props:{'post1':post}}" >
                                            <img :src="post.photoUrl" @click.passive="details(index)" class="mimg" alt="No image">
                                        </router-link>
                                        <div class="card-body p-0">
                                            <span class="badge badge-warning m-0">{{post.category.name}}</span>
                                            <div class="col-sm-12 my-2">
                                                <span class="text-primary" >{{post.title}}</span>
                                                <p class="text-muted"><span class="far fa-calendar-alt"></span> <span v-text="dateToString(post.created)">15/mars/2019</span> </p>
                                                <span v-html="post.description">description</span>
                                                <p v-if="post.author" class="t p-0 ext-muted">Ecrit par <a href="#" v-html="post.author.lastname +' '+post.author.firstname">Sawadogo Ousséni</a></p>
                                           </div> 
                                        </div>
                                           
                                    </div>
                                </div>
                                <template class="clearfix"></template>
                            </template>
                        </div>
                    </div>
                        
                        <div class="row justify-content-center">
                            <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li @click.prevent="fetch()" :class="pageNumber==0?'page-item disabled':'page-item'"><router-link class="page-link" :to="getURLRoot()+'?page='+(pageNumber-1)">Previous</router-link></li>
                                        <li @click.prevent="fetch()"   v-for="(p, index) in totalPages" :key="(index)" :class="index==pageNumber?'page-item active':'page-item'"><router-link :to="getURLRoot()+'?page='+index" class="page-link "  v-text="index+1"></router-link></li>
                                        <li @click.prevent="fetch()"   :class="pageNumber==(totalPages.length-1)?'page-item disabled':'page-item'"><router-link :to="getURLRoot()+'?page='+(pageNumber+1)" class="page-link" >Next</router-link></li>
                                    </ul>
                                </nav>
                        </div>
                </div>

                <div v-if="posts.length==0 && loaded  " class="card-body bg-white">
                    <div v-if="!$route.params.categoryId" class="row justify-content-center justify-items-center h-100">
                        <div class="col-sm-12">
                            <div class="jumbotron">
                                <h4 class="display-4 text-center"><strong>Articles list is empty !</strong></h4>
                                <p class="lead text-center"><strong>Our list of articles is empty for the moment 
                                    please revisit our website another time. Thanks for visiting our web site .</strong></p>
                            </div>
                        </div>
                    </div>

                    <div v-if="$route.params.categoryId" class="row justify-content-center">
                        <div class="col-sm-12 " style="min-height:200px;">
                            <div class="jumbotron">
                                <h4 class="display-5 text-center text-primary"><strong>This category of article  is empty !</strong></h4>
                                <p class="lead text-center"><strong>Visit others category of article ! .</strong></p>
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
import { stringify } from 'querystring';

export default {
     data(){
        return {
            posts:[],
            loaded:false,
            error: false,
            show:false,
            totalPages:0,
            pageNumber:0, 
            pageSize:3,
            categoryId:this.$route.params.categoryId,
            
        }
    },metaInfo(){
        return{
          title:'Liste de nos articles',
          meta:[
              {name:'description', content:'Vous trouverez ici la liste de nos articles'}
          ]
        }
       
    },
    methods:{
      async  fetch(){
           var urlRoot ="/api/posts?page=";
           if(this.categoryId!=null){
               urlRoot = "api/posts/category/"+this.categoryId+"?page=";
           }
            this.pageNumber=this.$route.query.page 
            if(!this.pageNumber){this.pageNumber=0}
            axios.get(urlRoot+this.pageNumber).then((data)=>{
                this.posts=[]
                data.data.content.forEach(post => {
                    this.posts.push(post)
                    
                });
                this.loaded = true
                
                this.totalPages =  Array(data.data.totalPages).fill(0)
                this.pageNumber = data.data.pageable.pageNumber
                this.pageSize   = data.data.pageable.pageSize
            }).catch(error=>{
                this.loaded = true 
               
            })
        },
        paginate(){

        },
        getURLRoot(){
            return window.location.pathname
        },
        details(index){
           window.localStorage.setItem("post",JSON.stringify(this.posts[index]))
           window.localStorage.setItem('pageNumber', this.pageNumber)
           window.localStorage.setItem('posts',JSON.stringify(this.posts))
           window.localStorage.setItem('pageSize', this.pageSize)
           window.localStorage.setItem("totalPages", JSON.stringify(this.totalPages))
        },
        dateToString(d){
          var date = new Date(Date.parse(d))
          var text = ' '
          if(date.getDate()<10)
           text+='0'
           text+=date.getDate()
           text+='/ '
           if (date.getMonth()<9)
            text+='0'
            text+=date.getMonth()+1
            text+='/ '
            text+= date.getFullYear()
           return text
        }
    
    },
    watch: {
        '$route'(IdOrl, IdNew){
             this.categoryId= this.$route.params.categoryId
             this.fetch()
        }
    },
    updated() {
      //  this.fetch()
    },
    
    
    
  async  mounted(){
       $('#description').attr('content', "La liste de nos articles ")
      this.posts = JSON.parse(window.localStorage.getItem('posts'))
      window.localStorage.removeItem('posts')
      if(!this.posts){
          this.posts = []
          this.fetch()
      }else{
          this.pageNumber = window.localStorage.getItem("pageNumber")
          window.localStorage.removeItem('pageNumber')
          this.totalPages = JSON.parse(window.localStorage.getItem("totalPages"))
          window.localStorage.removeItem('totalPages')
          this.pageSize    = window.localStorage.getItem("pageSize")
          window.localStorage.removeItem('pageSize')
      }
    
    },
beforeRouteLeave (to, from, next) {
    
    next()
}
    
}
</script>
<style >
    .disabled{
    pointer-events:none;
    opacity:0.7;
}
</style>