package controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;



import entities.Game;
import entities.Time;

public interface Ctrl {
	public List<Game> index();
	public Game show(int id);
	public Game create(String game, HttpServletResponse res);
	public Game update(int id,String quizJSON, HttpServletResponse res);
	public boolean destroy(int id);
	public List<Time> showTimeList(int id);
	public List<Time> tindex();
	public Time tshow(int id);
	public Time create(int gid);
	public Time addEndTime(int tid);
	public boolean tdestroy(int id);
}
