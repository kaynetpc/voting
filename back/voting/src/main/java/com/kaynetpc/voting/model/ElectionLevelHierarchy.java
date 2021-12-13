package com.kaynetpc.voting.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class ElectionLevelHierarchy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name; /**Faculty LEVEL */
    private String title; /** SOT */
    private int hierarchy; /**1 */
    private String descriptions;

    @OneToMany
    private List<Posts> posts;


    

    public ElectionLevelHierarchy(long id, String name, String title, int hierarchy, String descriptions,
            List<Posts> posts) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.hierarchy = hierarchy;
        this.descriptions = descriptions;
        this.posts = posts;
    }

    public ElectionLevelHierarchy() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getHierarchy() {
        return hierarchy;
    }

    public void setHierarchy(int hierarchy) {
        this.hierarchy = hierarchy;
    }

    public String getDescriptions() {
        return descriptions;
    }

    public void setDescriptions(String descriptions) {
        this.descriptions = descriptions;
    }

    public List<Posts> getPosts() {
        return posts;
    }

    public void setPosts(List<Posts> posts) {
        this.posts = posts;
    }

    
    


    
}
