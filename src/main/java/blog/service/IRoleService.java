package blog.service;


import blog.model.Role;

public interface IRoleService {
    Iterable<Role> findAll();

    void save(Role role);

    Role findByName(String name);
}
