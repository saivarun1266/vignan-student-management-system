package com.dada.vignan_stud_mgmt.controllers;

import com.dada.vignan_stud_mgmt.service.HodService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/hod")
public class HodController {

    private final HodService hodService;

    public HodController(HodService hodService) {
        this.hodService = hodService;
    }

    @PostMapping("/login")
    public Object login(@RequestParam String username,
                        @RequestParam String password) {

        return hodService.login(username, password);
    }
}