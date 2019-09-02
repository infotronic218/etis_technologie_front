<template>
    <div>
       <loader  :loading="loader" />
        <h4 class="text-center text-uppercase"> Image file manager </h4>
       
        <div class="col-sm-12">
             <div class="card-header ">
            <div class="row">
                <div class="col-sm-12">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb" >
                            <li class="breadcrumb-item"><a href="#" class="btn-fo" name="root">root</a></li>
                        </ol>
                        <button class="mx-1 btn " title="Create Folder" @disabled="currentPath!=root"   @click.prevent="createForder()"> <i class="fas fa-folder-plus text-warning btn1"></i></button>
                        <button class="mx-1 btn btn1"  @click.prevent="modalFileUpload()" title="Upload File">  <i class="fas fa-file-upload  text-success  btn1"></i> </button>
                    </nav>
                </div>
            </div>
             </div>
        </div>
        <div class="col-sm-12 mb-3">
               <div class="table-responsive">
                    <table class="table">
                       <thead>
                           <tr>
                               <th>ID</th>
                               <th>Date</th>
                               <th>Image</th>
                               <th>Actions</th>
                           </tr>
                       </thead>
                       <tbody id="tbody" ref="tbody">
                           <tr>
                               <td> <a href="#" > <i class="fa fa-folder" aria-hidden="true"></i> Images </a></td>
                                <td> 15/12/2018</td>
                                <th>Image</th>
                                 <td>Images</td>
                           </tr>
                           <tr>
                                <td> <a href="#" > <i class="fa fa-folder" aria-hidden="true"></i> json data </a></td>
                                <td> 15/12/2018</td>
                                 <td>Images</td>
                           </tr>
                       </tbody>
                    </table>
               </div>
        </div>
        <!--MODAL--->
        <div class="modal fade" id="createFolder" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog " role="document">
                <div class="modal-content bg-dark">
                    <div class="modal-header "> 
                        <h5 class="modal-title text-center text-white">Creation de dossier</h5>
                            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                    <div class="modal-body bg-white">
                      <div class="col-sm-12 ">
                          <div class="row">
                              <div class="col-sm-4">
                                <label for="folder">Nom dossier</label>
                              </div>
                              <div class="col-sm-8"> 
                                <input name="folder" v-model="folderName" placeholder="Entrez le nom du dossier" class="form-control" type="text">
                              </div>
                          </div>
                      </div>
                      <div class="col-sm-12 mt-3">
                          <div class="row">
                              <div class="col-sm-4">
                                <label for="folder">Description</label>
                              </div>
                              <div class="col-sm-8"> 
                                <textarea name="folderDescription" v-model="folderDescription" placeholder="Entrez le nom du dossier" class="form-control" rows="3" type="text"></textarea>
                              </div>
                          </div>
                      </div>
                      <div class="col-sm-12 mt-3">
                        <button type="button" class="btn btn-secondary mx-1" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary mx-1" @click.prevent="saveFolder()">Create</button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <!--MODAL file upload--->
        <div class="modal fade" id="fileUpload" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog " role="document">
                <div class="modal-content bg-dark">
                    <div class="modal-header "> 
                        <h5 class="modal-title text-center text-white">Upload a File</h5>
                            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                    <div class="modal-body bg-white">
                      <div class="col-sm-12 px-0">
                          <div class="row">
                              <div class="col-sm-3">
                                <label for="folder">File</label>
                              </div>
                              <div class="col-sm-9"> 
                                <input @change="onFileChange"   class="form-control" type="file" accept="image/**">
                                <label v-if="errorFile" class="text-danger">Please select an image file</label>
                              </div>
                          </div>
                      </div>
                      <div class="col-sm-12 mt-3 px-0">
                          <div class="row">
                              <div class="col-sm-3">
                                <label for="filedescription">Description</label>
                              </div>
                              <div class="col-sm-9"> 
                                <textarea name="filedescription" v-model="fileDescription" placeholder="Entrez la description du fichier" class="form-control" rows="3" type="text"></textarea>
                              </div>
                          </div>
                      </div>
                      
                      <div class="col-sm-12 mt-3">
                        <button type="button" class="btn btn-secondary mx-1" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary mx-1" @click.prevent="saveFile()">Save</button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal File upload-->
    </div>
    
</template>
<script>
import db from '../../database'
import Loader from '../Loader.vue'
export default {
    components:{
          'loader':Loader,
    },
    data() {
        return {
            db: db.db,
            fs: db.fs,
            currentPath:'root',
            root:'root',
            folderName:'',
            folderDescription:'',
            fileDescription:'',
            file:null,
            errorFile:false,
            loader:false,
           

        }
    },
   methods: {
       loadFolder(path){
          var els = path.split('/')
          this.currentPath=path
          var mypath = ''
           $('.breadcrumb').html('');
           var index = 0 ;
          els.forEach((el)=>{
              index ++;
              if(index>1){mypath+='/'+el }else{  mypath = el}
              if(index==els.length-1){ $('.breadcrumb').append('<li class="breadcrumb-item active"><a href="#" class="btn-fo" name="'+mypath+'">'+el+'</a></li>')}
              else {$('.breadcrumb').append('<li class="breadcrumb-item"><a href="#" class="btn-fo" name="'+mypath+'">'+el+'</a></li>')}
          })
          if(els.length%2==0){
              path= path+'/data'
          }
          this.currentPath=path
          this.db.collection(path).onSnapshot((data)=>{
                 $('#tbody').html('')
                 if(els.length%2==0){
                     //DATA
                     data.forEach(snap=>{
                        var html = '<tr><td> <a  class="" > <i class="fa fa-file" aria-hidden="true"></i> '+ snap.id +'</a></td>'
                        html+=     '<td> 15/12/2018</td>'
                        html+=     '<td><div class="img-container1"><img alt="img" class="img-fix" src="'+snap.data().url+'"></div></td>'
                         html+=     '<td><span title="Copy the image url" id="'+snap.data().url +'" class="fas fa-copy icon1 btn-copy  text-warning  mx-1"></span><i class="fa fa-trash mx-1 icon1 text-danger" aria-hidden="true"></i></td></tr>'
                        //console.log(snap)
                        $('#tbody').append(html)
                       })
                 }else{
                     //Listing folder
                  data.forEach(snap=>{
                  var html = '<tr><td> <a href="#" class="btn-fo" name="'+snap.ref.path+'"> <i class="fa fa-folder" aria-hidden="true"></i> '+ snap.id +'</a></td>'
                 
                  
                  html+=     '<td>'+1222+'</td>'
                  html+=     '<td>------</td>'
                  html+=     '<td>Images</td></tr>'
                 // console.log(snap)
                  $('#tbody').append(html)
                 })
                 }
              })
          
       },
       createForder(){
        $('#createFolder').modal('show')
       },
       saveFolder(){
           this.db.collection(this.root).doc(this.folderName).set({'description':this.folderDescription});
           //console.log(this.folderName, this.folderDescription)
           this.folderDescription=''
           this.folderName = ''
           $('#createFolder').modal('hide')
           bootbox.alert("Folder create successfully !")
          
       },
       modalFileUpload(){
          this.file = null
          this.fileDescription = ''
          $('#fileUpload').modal('show')
       },
       onFileChange(e){
        if(e.target)
           this.file = e.target.files[0] || e.dataTransfer.files[0]
         if(this.file){this.errorFile=false}else{this.errorFile=true}
       },
       saveFile(){
         var path = this.currentPath.replace('data', '');
         var timestamp = Date.now()
         path = path+timestamp+'.png' ;
         if(this.file){
           var uploadTask= this.fs.ref(path).put(this.file);
           $('#fileUpload').modal('hide')
           this.loader = true;
           uploadTask.on('state_changed', (snapshot)=>{
                
           },(error)=>{
             this.loader = false;
           },()=>{
               uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl=>{
                  //console.log(downloadUrl)
                  this.db.collection(this.currentPath).doc(''+timestamp).set({
                      'url':downloadUrl,
                      'description':this.fileDescription,
                      'path':path
                  }).then(snap=>{
                      bootbox.alert("File saved successfully !")
                      this.loader = false;
                  }).catch(error=>{
                      this.loader = false;
                  })
               })
           })
         }else{
             this.errorFile= true
         }
         
       }
   },
    mounted() {
         var $this = this
         $(document).on('click','.btn-fo',function(){
            $this.loadFolder(''+this.name)
        })
        $(document).on('click','.btn-copy',function(e){
            e.preventDefault();
          var textarea = document.createElement("textarea");
          textarea.textContent = this.id;
          textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
          document.body.appendChild(textarea);
         textarea.select();
         try {
             document.execCommand("copy"); 
             bootbox.alert("Url copied succesffully !")
             return true
            // Security exception may be thrown by some browsers.
         } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
         } finally {
            document.body.removeChild(textarea);
        }
    
          
        })
        this.loadFolder(this.root)
       // this.loadFolder(this.currentPath)
    },
}
</script>
<style>
 .img-fix{
     max-height: 100%;
     max-width: 100%;
 }
 .img-container1{
     height: 120px;
     width: 120px;
 }
 .icon1{
     font-size: 24px;
 }

 .btn1{
     font-size: 24px;
 }
</style>