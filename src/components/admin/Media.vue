<template>
    <div>
        <h1 class="text-center">My media file</h1>
        <div class="col-sm-12">
            <h6>
                <a href="#" name="root" class="btn-fo">Root</a>
                <a href="#">/images</a>
                <a href="#">/test</a>
            </h6>
            <div class="row">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb" >
                        <li class="breadcrumb-item"><a href="#" class="btn-fo" name="root">root</a></li>
                    </ol>
                </nav>
                 <a class="mx-1" href="#" @click.prevent="createForder()"> <i class="fas fa-folder-plus"></i> Create folder</a>
                 <a class="mx-1" href="#"> <i class="fas fa-file-upload    "></i> Upload file</a>
            </div>
        </div>
        <div class="col-sm-12 mb-3">
               <div class="table-responsive">
                    <table class="table">
                       <thead>
                           <tr>
                               <th>Name</th>
                               <th>Date</th>
                               <th>Actions</th>
                           </tr>
                       </thead>
                       <tbody id="tbody" ref="tbody">
                           <tr>
                               <td> <a href="#" > <i class="fa fa-folder" aria-hidden="true"></i> Images </a></td>
                                <td> 15/12/2018</td>
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
    </div>
    
</template>
<script>
import db from '../../database'
export default {
    data() {
        return {
            db: db.db,
            fs: db.fs,
            currentPath:'root',
            root:'root',
            folderName:'',
            folderDescription:''

        }
    },
   methods: {
       loadFolder(path){
          var els = path.split('/')
          path +=els.length%2!=0?'':'/'+els[els.length-1];
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
          this.db.collection(path).onSnapshot((data)=>{
             $('#tbody').html('')
             //console.log(data)
             data.forEach(snap=>{
                  var html = '<tr><td> <a href="#" class="btn-fo" name="'+path+"/"+snap.id+'"> <i class="fa fa-folder" aria-hidden="true"></i> '+ snap.id +'</a></td>'
                  html+=     '<td> 15/12/2018</td>'
                  html+=     '<td>Images</td></tr>'
                  console.log(snap)
                 $('#tbody').append(html)
             })
          })  
       },
       createForder(){
           console.log("Click")
        $('#createFolder').modal('show')
         //this.db.collection(this.currentPath).doc().set()
       },
       saveFolder(){
           this.db.collection(this.root).doc(this.folderName).collection('data').doc('description').set({'description':this.folderDescription})
           this.folderDescription=''
           this.folderName = ''
           $('#createFolder').modal('hide')
           console.log(this.folderName, this.folderDescription)
       }
   },
    mounted() {
         var $this = this
         $(document).on('click','.btn-fo',function(){
            $this.loadFolder(''+this.name)
        })
       // this.loadFolder(this.currentPath)
    },
}
</script>