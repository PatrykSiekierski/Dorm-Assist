package me.dormdesk.api.Controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/form")
public class FormController {

    @CrossOrigin
    @GetMapping("/get")
    public String test() {
        return "Hello world!";
    }

    @CrossOrigin
    @PostMapping("/post")
    public String postTest(@RequestBody String test) {
        return test;
    }
}
