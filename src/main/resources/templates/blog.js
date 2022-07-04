let blogs = document.getElementById("blog")
let pageable = document.getElementById("pageable")

function showBlogContent() {
    let str = `<button data-toggle="modal" data-target="#exampleModal" onclick="showAddForm()">Them Blog</button>
    <button onclick="showAllBlogs(0)">List Blog</button>`
    blogs.innerHTML = str
}

function showAddForm() {
    let str = `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Blog</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">X</button>
            </div>
            <div class="modal-body">
               
                    <label>Content: </label>
                    <input type="text" id="contents" class="form-control">
                    <label>Description: </label>
                    <input type="text" id="descriptions" class="form-control">
                  
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="saveBlog()" >Save changes</button>
            </div>
        </div>
    </div>
</div>`
    blogs.innerHTML  = str
}

function saveBlog() {
    let content = document.getElementById('contents').value;
    let description = document.getElementById('descriptions').value;
    let userId = localStorage.getItem('id');
    let data = {
        content: content,
        description: description,
        user: {
            id: userId
        }
    }

    $.ajax({
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        url: "http://localhost:8081/blog",
        data: JSON.stringify(data),
        success: function () {
            alert("Add done!")
            $('#exampleModal').modal('hide');
        },
        error: function (error) {
            console.log(error)
        }
    })
}


function showAllBlogs(number) {
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        type: "GET",
        url: "http://localhost:8081/blog?page=" + number,
        success: function (list) {
            console.log(list)
            let str = "";
            loadBlog(list.t.content)
            let number1 = list.t.pageable.pageNumber;
            if (list.t.pageable.pageNumber > 0 && list.t.pageable.pageNumber+1 === list.t.totalPages) {
                str += `<button onclick="loadData(${number1 - 1})">Trước</button> `;
            }
            str += list.t.pageable.pageNumber+1 + "/" + list.t.totalPages
            if (list.t.pageable.pageNumber <= 0 && list.t.pageable.pageNumber+1 !== list.t.totalPages) {
                str += ` <button onclick="showAllBlogs(${number1 + 1})">Sau</button>`;
            }
            pageable.innerHTML = str
        }, error: function (error) {
            document.write("Error")
            console.log(error)
        }
    })
}

function loadBlog(list) {
    let str = "";
    for (let i = 0; i < list.length; i++) {
        str += `${i+1},
                    ${list[i].content},
                   ${list[i].description},
                   ${list[i].username}
                    <button class="btn btn-primary" onclick="showEditForm(${list[i].id})">Edit</button>`
    }
    blog.innerHTML = str;
}

