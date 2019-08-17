<template>
  <div class="container px-0 mt-3">
    <nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true"><i class="fa fa-plus" aria-hidden="true"></i> New post </a>
    <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"><i class="fa fa-list" aria-hidden="true"></i> Post list</a>
  </div>
</nav>
<div class="tab-content" id="nav-tabContent">
  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
    <div class="container my-2">
      <div class="row justify-content-center">
          <div class="col-sm-12">
           <div class="row mb-3">
               <select class="form-control" type="text" name="seleted" v-model="post.category" >
                 <option class="form-control" disabled="disabled" selected="selected" value="null" >Select the categrory of the article </option>
                 <option class="form-control" v-for="cat in categories" v-bind:key="cat.name" selected="" :value="cat.name" :label="cat.name"></option>
               </select>
           </div>
            <div class="row mb-3">
              <input class="form-control" type="text" v-model="post.title" placeholder="Title">
           </div>
           <div class="row mb-3">
              <textarea  cols="30" v-model="post.description" rows="3" placeholder="Description" class="form-control"></textarea>
           </div>
           <div class="row mb-3">
             <div class="col-sm-12 p-0">
               <textarea id="editor"   v-model="post.content" rows="6" placeholder="Content" class="form-control"></textarea>
              </div>
             </div>
           <div class="row mb-3">
              <div class="col-sm-2 ">
              <label>Image</label>

             </div>
             <div class="col-sm-8 p-0">
               <input type="url" v-model="post.photoUrl"  placeholder="Enter the url of the image" class="form-control">
             </div>
             <div class="col-sm-2 ">
               <img v-bind:src="post.photoUrl" alt="No Image for this post" class="mimg" >
              </div>
           </div>
           <div class="row mb-3">
             <button class="btn btn-primary" @click.prevent="savePost">Enregistrer</button>
           </div>
         </div>
      </div>
    </div>
  </div>
  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
    <div class="container my-2">
      <div class="row justify-content-center p-2">
          <input type="text" v-model="keyword" class="form-control" placeholder="Search post by title">
       </div>
       <div class="row h-100">
          <div v-for="(post , index ) in  filteredPosts" v-bind:key="post.id" class="col-sm-4 thumb p-2 ">
            <div class="card h-100 p-0">
                 <div class="card-image-top img-container" >
                    <img class="mimg o-img"  :src="post.photoUrl">
                    <div class=" h-100 w-100  justify-item-center justify-content-center  o-text bg-secondary">
                       <div class="col-sm-12">
                       <p class="text-center py-2 text-white" v-text="post.description">Description</p>
                       </div>
                    </div>
                     
                 </div>
              <div class="card-body">
                 <span v-text="post.title" class="text-center m-2">Title</span>
              </div>
              <div class="card-footer bg-dark p-1">
                 <div class="row justify-content-center ">
                   <label class="switch mx-1">
                      <input type="checkbox" :checked="post.active" @change.prevent="activatePost($event,index, post.id)">
                      <span class="slider round"></span>
                    </label>
                  <button class="btn btn-warning mx-1"    @click.prevent="editPost(index)"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-danger mx-1"  @click.prevent="deletePost(index, post.id)"><i class="fas fa-trash"></i></button>
                </div>
              </div>
            </div>
          </div>
       </div>
    </div>
  </div>
</div>
    
    

    <!--EDITS PARTS -->
    
      
    
  </div>
</template>



<script>
    import axios from 'axios'


    import {
        setInterval
    } from 'timers';

    export default {
        data() {
            return {
                post: {
                    description: null,
                    title: null,
                    content: null,
                    active: null,
                    id: null,
                    category: null,
                    photoUrl: 'https://makitweb.com/demo/broken_image/images/noimage.png',
                },
                categories: [],

                currentIndex: null,
                editor: null,
                posts: [],
                keyword: '',
                headers: {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.Store.state.authorization
                    }
                }

            }
        },
        methods: {
            error() {
                window.Store.commit('logout')
                bootbox.alert("An error occur while fetching data ! Reflesh the page and try again")
            },
            savePost() {
                this.post.content = this.editor.summernote('code')
                if (!this.post.id) {
                    bootbox.confirm("Do you want to save this Post?", (state) => {
                        if (state) {
                            axios.post('/api/admin/posts/' + this.post.category, {
                                description: this.post.description,
                                title: this.post.title,
                                content: this.post.content,
                                active: this.post.active,
                                photoUrl: this.post.photoUrl
                            }, this.headers).then((data) => {
                                this.clearData()
                                this.posts.push(data.data)
                                 document.getElementById('nav-profile-tab').click()
                            }).catch(error => {
                                this.error()
                            })
                        }
                    })

                } else {
                    this.updatePost()
                }
            },
            updatePost() {
                bootbox.confirm("Do you want to update this Post ?", (state) => {
                    if (state) {
                        axios.put('/api/admin/posts/' + this.post.id + '/' + this.post.category, {
                            description: this.post.description,
                            title: this.post.title,
                            content: this.post.content,
                            active: this.post.active,
                            photoUrl: this.post.photoUrl
                        }, this.headers).then((data) => {
                            this.clearData()
                            let position = -1,
                                i = 0
                            this.posts.forEach(p => {

                                if (p.id == data.data.id) {
                                    position = i;
                                }
                                i++;
                            })
                            if (position >= 0) {
                                this.posts[position] = data.data
                            }
                            console.log(this.posts)
                            let k = this.keyword
                            this.keyword = "8955"
                            this.keyword = k
                            bootbox.alert("The post have been successfully updated !")
                            document.getElementById('nav-profile-tab').click()
                        }).catch(error => {
                            this.error()
                        })
                    }
                })

            },
            editPost(index) {
                let post = this.filteredPosts[index]
                this.post.content = post.content
                this.post.description = post.description
                this.post.title = post.title
                this.post.id = post.id
                this.post.active = post.active
                this.post.category = post.category.name
                this.post.photoUrl = post.photoUrl
                this.currentIndex = index
                this.editor.summernote('code', this.post.content)
                this.goToTop()
                document.getElementById('nav-home-tab').click()
            },
            deletePost(index, id) {
                bootbox.confirm("Do you want to delete this post ?", (state) => {
                    if (state) {
                        axios.delete('/api/admin/posts/' + id, this.headers).then((data) => {
                            bootbox.alert("Post deleted successfully !")
                            let i = this.getIndex(id)
                            if (i >= 0)
                                this.$delete(this.posts, i)
                        }).catch(error => {
                            bootbox.alert("An error occur while deleting the post !")
                        })
                    }
                })
            },
            fetch() {
                axios.get("/api/admin/posts", this.headers).then((data) => {
                    data.data.forEach(post => {
                        this.posts.push(post)
                    });
                })
                axios.get('/api/admin/categories', this.headers).then((data) => {
                    data.data.forEach(category => {
                        this.categories.push(category)
                    });
                }).catch(error => {
                    this.error()
                })


            },
            clearData() {
                this.post = {}
                this.editor.summernote('code', '')
            },
            getIndex(id) {
                let i = 0,
                    p = -1
                this.posts.forEach(post => {
                    if (post.id == id) {
                        p = i
                    }
                    i++
                })
                return p;
            },
            goToTop() {
                document.body.scrollTop = 260
                document.documentElement.scrollTop = 260
            },
            activatePost(event, index, id) {
                var state = event.target.checked
                event.target.checked = !state
                var message = ""
                if (state) message += "Do you want to active this post ?"
                else message += "Do you to desactivate this post ?"
                bootbox.confirm(message, (ok) => {
                    if (ok) {
                        axios.put('/api/admin/posts/' + id + '/activate', {
                            active: state,
                        }, this.headers).then((data) => {
                            if (data) {
                                console.log(data)
                                let i = this.getIndex(id)
                                if (i > 0) {
                                    this.posts[i] = data.data
                                    let k = this.keyword
                                    this.keyword = "8955"
                                    this.keyword = k
                                }
                                bootbox.alert("Post updated successfuly !")
                            } else {
                                bootbox.alert("Error when updating the post .")
                            }
                        })
                    }
                })
            }


        },

        mounted() {
            this.fetch()
            this.$loadScript('https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote-bs4.js')
                .then(() => {
                    this.editor = $('#editor').summernote({
                        placeholder: 'Enter your article content here',
                        height: 400,
                    });
                }).catch(error => {
                    console.log(error)
                })
        },
        computed: {
            filteredPosts() {
                return this.posts.filter((post) => {
                    if (post.title)
                        return post.title.match(this.keyword)
                    else if (post.description)
                        return post.description.match(this.keyword)
                    else if (post.content)
                        return post.content.match(this.keyword)
                    return false
                })
            },
        }
    }
</script>
<style>
    @import url('https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote-bs4.css');
    .thumb:nth-child(nd) {
        clear: both;
    }
    
    .img-container {
        position: relative;
    }
    
    .o-img {
        opacity: 1;
        display: block;
        width: 100%;
        height: auto;
        transition: .5s ease;
        backface-visibility: hidden;
    }
    
    .o-text {
        transition: .9s ease;
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        text-align: center;
    }
    
    .img-container:hover .o-text {
        opacity: 1;
        overflow: hidden;
    }
    
    .img-container:hover .o-img {
        opacity: 0.3;
    }
    /* The switch - the box around the slider */
    
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }
    /* Hide default HTML checkbox */
    
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    /* The slider */
    
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }
    
    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }
    
    input:checked+.slider {
        background-color: #2196F3;
    }
    
    input:focus+.slider {
        box-shadow: 0 0 1px #2196F3;
    }
    
    input:checked+.slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
    /* Rounded sliders */
    
    .slider.round {
        border-radius: 34px;
    }
    
    .slider.round:before {
        border-radius: 50%;
    }
</style>