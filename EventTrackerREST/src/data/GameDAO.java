package data;

import java.util.List;

import entities.Game;
import entities.Time;

public interface GameDAO {
	public List<Game> index();
	public Game show(int id);
	public Game create(Game game);
	public Game update(int id, Game game);
	public boolean destroy(int id);
	public List<Time> showTimeList(int id);
}
