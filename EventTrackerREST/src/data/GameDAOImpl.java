package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import entities.Game;
import entities.Time;

@Transactional
public class GameDAOImpl implements GameDAO{

	@PersistenceContext
	private EntityManager em;
	
	@Override
	public List<Game> index() {
		String query = "select g From Game g";
		return em.createQuery(query,Game.class).getResultList();
	}

	@Override
	public Game show(int id) {
		
		return em.find(Game.class, id);
	}

	@Override
	public Game create(Game games) {
		System.out.println(games);
		em.persist(games);
		em.flush();
		return games;
	}

	@Override
	public Game update(int id, Game game) {
		Game g = em.find(Game.class, id);
		g.setCategory(game.getCategory());
		g.setName(game.getName());
		g.setCompany(g.getCompany());
		g.setTimeList(game.getTimeList());
		return g;
	}

	@Override
	public boolean destroy(int id) {
		Game g = em.find(Game.class, id);
		if (g == null) {
			return false;
		} else {
			em.remove(g);
			return true;
		}
	}

	@Override
	public List<Time> showTimeList(int id) {
		Game g = em.find(Game.class, id);
		return g.getTimeList();
	}




}
