package com.leverx.leverxspringdemo.domain;

public class Book {
	
	private long bid;
	private int authid;	
	private String caption;
	
	public long getId() {
		return bid;
	}

	public void setId(long id) {
		this.bid = id;
	}

	public int getAuthid() {
		return authid;
	}

	public void setAuthid(int id) {
		this.authid = id;
	}
	
	public String getCaption() {
		return caption;
	}

	public void setCaption(String caption) {
		this.caption = caption;
	}

	
	
}
