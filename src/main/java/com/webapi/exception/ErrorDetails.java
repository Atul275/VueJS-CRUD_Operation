package com.webapi.exception;

import java.util.*;

public class ErrorDetails {
	private Date timeTamp;
	private String message;
	private String details;
	
	public ErrorDetails(Date timeTamp, String message, String details) {
		super();
		this.timeTamp = timeTamp;
		this.message = message;
		this.details = details;
	}
	
	public Date getTimeTamp() {
		return timeTamp;
	}
	public void setTimeTamp(Date timeTamp) {
		this.timeTamp = timeTamp;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getDetails() {
		return details;
	}
	public void setDetails(String details) {
		this.details = details;
	}
}
