package fr.quotation.APIQuotation.Configuration;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MetricsRedirectController
{
    @GetMapping("/metrics")
    public String redirectToPrometheus()
    {
        return "redirect:/actuator/prometheus";
    }
}

