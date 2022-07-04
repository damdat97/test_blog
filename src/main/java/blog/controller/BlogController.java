package blog.controller;

import blog.model.Blog;
import blog.model.DTO;
import blog.service.impl.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/blog")
public class BlogController {
    @Autowired
    private BlogService blogService;

    @GetMapping
    public ResponseEntity<DTO<Page<Blog>>> findAll(@PageableDefault(value = 3) Pageable pageable) {
        return new ResponseEntity<>(new DTO<>("Lấy danh sách thành công", blogService.findAll(pageable), "OK"), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Blog> create(@RequestBody Blog blog) {
        blogService.save(blog);
        return new ResponseEntity<>(blog, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Blog> update(@PathVariable Long id, @RequestBody Blog blog) {
        Optional<Blog> product1 = blogService.findById(id);
        if(!product1.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        blog.setId(product1.get().getId());
        blogService.save(blog);
        return new ResponseEntity<>(blog, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Blog> update(@PathVariable Long id) {
        blogService.remove(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Blog>> findById(@PathVariable Long id) {
        return new ResponseEntity<>(blogService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/find-by-user")
    public ResponseEntity<Iterable<Blog>> findByUser(@RequestParam(value = "username", defaultValue = "") String username) {
        return new ResponseEntity<>(blogService.findByUser(username), HttpStatus.OK);
    }
}
