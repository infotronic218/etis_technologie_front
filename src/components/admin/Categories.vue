<template>
    <div class="container">
        <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true"><i class="fa fa-play-circle-o" aria-hidden="true"></i> New Category</a>
                <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"><i class="fa fa-list" aria-hidden="true"></i> List category</a>
            </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <div class="container">
                    <form class="row justify-content-center">
                            <div class="col-sm-12">
                                    <div class="row my-2">
                                        <input type="text" ref="name"  :readonly="forEdit" v-model="category.name" placeholder="Enter the name of the category" class="form-control">
                                    </div>
                                    <div class="row my-2">
                                        <textarea type="text" rows="4" v-model="category.description" placeholder="Enter the description of the category" class="form-control"></textarea>
                                    </div>
                                    <div class="row my-2">
                                    <button class="btn btn-primary" @click.prevent="saveCat">Save</button>
                                    </div>    
                            </div>  
                    </form>
                </div>
            </div>
            <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                  <div class="container">
                           <table class="table table-bordered">
                               <thead>
                                   <tr>
                                       <th>Name</th>
                                       <th>Description</th>
                                       <th>Actions</th>
                                   </tr>
                               </thead>
                               <tbody>
                                   <tr v-for="(cat, index) in filteredCats" v-bind:key="cat.name">
                                       <td scope="row"><p>{{cat.name}}</p> </td>
                                       <td><p>{{cat.description}}</p></td>
                                       <td>
                                           <button class="btn btn-warning m-1" @click.prevent="setUpdate(index)"><i class="fas fa-edit    "></i></button>
                                            <button class="btn btn-danger m-1"><i class="fas fa-trash" @click.prevent="deleteCat(cat.name, index)"></i></button>
                                       </td>
                                   </tr>
                                   
                               </tbody>
                           </table>
                    </div>
            </div>

        </div>
    </div>
</template>
<script>
import axios from 'axios'
import bootbox from 'bootbox'
import { posix } from 'path';

export default {
    components:{
      
    },
    data(){
        return {
            category:{
                name:null,
                description:null,
            },
            categories:[],
            forEdit:false,
            keyword:'',
            message:'',
            headers:{
                headers:{
                   'Content-Type':'application/json',
                   'Authorization':'Bearer '+window.Store.state.authorization
               }
            }
        }
    }, 
    methods:{
        fetch(){
           axios.get('/api/admin/categories',
           {
               headers:{
                   'Content-Type':'application/json',
                   'Authorization':'Bearer '+window.Store.state.authorization
               }
           }).then((data)=>{
               data.data.forEach(category => {
                   this.categories.push(category)
               });
           })
        }, 
        saveCat(){
            if(this.category.name!=null){
            
               bootbox.confirm("Do you want to save this category?",(state)=>{
                  if(!this.forEdit){
                  axios.post('/api/admin/categories',this.category,
                   this.headers
                  ).then((data)=>{
                      this.categories.push(data.data)
                      this.category.name=null
                      this.category.description=null
                      this.forEdit = false
                      bootbox.alert("Category saved successfully!")
                  }).catch((error)=>{
                      bootbox.alert("Problem with data saved ! An error ocurr when saving data !")
                  })
                 }else if(this.forEdit){
                   axios.post('/api/admin/categories/'+this.category.name, this.category,this.headers).then((data)=>{
                      this.category.name=null
                      this.category.description=null
                      var  postion=-1 , i = 0 ;
                      this.categories.forEach(d=>{
                          if(d.name.localeCompare(data.data.name)==0){
                             postion= i ;

                          }
                          
                          i++;
                      })
                
                      if(postion>=0 && postion < this.categories.length){
                       this.categories[postion]= data.data
                      }
                      this.refresh()
                      this.forEdit = false
                      bootbox.alert("Category updated successfully!")
                  }).catch((error)=>{
                      this.message={
                          "type":"Error", 
                          "text": " "
                      }
                      bootbox.alert("Error an error occur while updating the category !")
                  })
              }
               })
              
            }else{
                  bootbox.alert("Category name must not be empty !")
            }
        },
        deleteCat(id, index){
         bootbox.confirm("Do you want to delete category with ID "+id, (state)=>{
           if(state){
             axios.delete('/api/admin/categories/'+id, this.headers).then((data)=>{
               this.$delete(this.categories, index)
               this.refresh()
             }).catch((error)=>{
                 console.log(error)
             })
            }
         })
         
        },
        setUpdate(index){
           var  cat = this.filteredCats[index]
           this.category =JSON.parse(JSON.stringify(cat))
            this.forEdit = true
        }, 
        refresh(){
          let key = this.keyword
           this.keyword = '126'
           this.keyword = key
        }
    },
    computed:{
        filteredCats(){
            return this.categories.filter((cat)=>{
               
                return cat.name.match(this.keyword)
            })
        },
        

    }, mounted(){
        this.fetch()

    }
}
</script>
