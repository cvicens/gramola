
package com.redhat.gramola.gateway.beans;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyDescription;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;


/**
 * 
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "naming_strategy",
    "file"
})
public class FileUpload {

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("naming_strategy")
    @JsonPropertyDescription("")
    private String namingStrategy;
    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("file")
    @JsonPropertyDescription("")
    private String file;

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("naming_strategy")
    public String getNamingStrategy() {
        return namingStrategy;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("naming_strategy")
    public void setNamingStrategy(String namingStrategy) {
        this.namingStrategy = namingStrategy;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("file")
    public String getFile() {
        return file;
    }

    /**
     * 
     * (Required)
     * 
     */
    @JsonProperty("file")
    public void setFile(String file) {
        this.file = file;
    }

}
