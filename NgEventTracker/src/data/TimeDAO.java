package data;

import java.util.List;

import entities.Time;

public interface TimeDAO {
	public List<Time> index();
	public Time show(int id);
	public Time create(int i,Time time);
	public Time addEndTime(int id);
	public boolean destroy(int id);
}
