package test;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Game;



public class EventTest {
	private EntityManager em = null;

	@Before
	public void setup() {
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("EventTracker");
		em = emf.createEntityManager();
	}

	@After
	public void tearDown() {
		if (em != null) {
			em.close();
		}
	}

	@Test
	public void test() {
		boolean pass = true;
		assertEquals(pass, true);
	}
	
	@Test
	public void test_game_name() {
		Game g = em.find(Game.class, 1);
		assertEquals("Blizzard", g.getCompany());
	}
	@Test
	public void test_game_time() {
		Game g = em.find(Game.class, 1);
		assertEquals("Blizzard", g.getTimeList().get(0).getStartTime().getTime());
	}
	

}
