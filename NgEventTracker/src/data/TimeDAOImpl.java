package data;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import entities.Game;
import entities.Time;

@Transactional
public class TimeDAOImpl implements TimeDAO{

	@PersistenceContext
	private EntityManager em;
	
	@Override
	public List<Time> index() {
		String query = "select t From time t";
		return em.createQuery(query,Time.class).getResultList();
	}

	@Override
	public Time show(int id) {
		// TODO Auto-generated method stub
		return em.find(Time.class, id);
	}

	@Override
	public Time create(int gid,Time time) {
		Game g = em.find(Game.class, gid);
		time.setGame(g);
		em.persist(time);
		em.flush();
		return time;
	}

	@Override
	public boolean destroy(int id) {
		Time t = em.find(Time.class, id);
		if (t == null) {
			return false;
		} else {
			em.remove(t);
			return true;
		}
	}

	@Override
	public Time addEndTime(int id) {
		Time t = em.find(Time.class, id);
		t.setEndTime(new Date());
		return t;
	}

}
