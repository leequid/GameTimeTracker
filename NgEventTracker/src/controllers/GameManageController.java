package controllers;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.GameDAO;
import data.TimeDAO;
import entities.Game;
import entities.Time;

@RestController
public class GameManageController implements Ctrl {
	@Autowired
	private GameDAO gdao;
	@Autowired
	private TimeDAO tdao;

	@RequestMapping(path = "ping", method = RequestMethod.GET)
	public String ping() {
		return "pong";
	}

	@RequestMapping(path = "games", method = RequestMethod.GET)
	public List<Game> index() {
		return gdao.index();
	}

	@RequestMapping(path = "games/{id}", method = RequestMethod.GET)
	public Game show(@PathVariable int id) {
		// TODO Auto-generated method stub
		return gdao.show(id);
	}

	@RequestMapping(path = "games", method = RequestMethod.POST)
	public Game create(@RequestBody String gameJSON, HttpServletResponse res) {
		ObjectMapper mapper = new ObjectMapper();
		Game mapped = null;

		if (gameJSON == null || gameJSON.equals("")) {
			res.setStatus(402);
		} else {
			try {
			
				mapped = mapper.readValue(gameJSON, Game.class);
				
				System.out.println("3");
				gdao.create(mapped);
				System.out.println("4");
				res.setStatus(200);
			} catch (Exception e) {
				System.out.println("5");
				e.printStackTrace();
				res.setStatus(400);
			}

			return mapped;
		}
		return null;
	}

	
	@RequestMapping(path = "games/{id}", method = RequestMethod.PUT)
	public Game update(@PathVariable int id, @RequestBody String gameJSON, HttpServletResponse res) {
		ObjectMapper mapper = new ObjectMapper();
		Game mapped = null;
		
		
		if(gameJSON == null || gameJSON.equals("")){
			res.setStatus(400);
		}
		else{
			try {
			
				mapped = mapper.readValue(gameJSON, Game.class);
				
				gdao.update(id, mapped);
			
				res.setStatus(200);
			} catch (Exception e) {
				res.setStatus(400);
			}

			return mapped;
		}
		return null;
	}

	@RequestMapping(path = "games/{id}", method = RequestMethod.DELETE)
	public boolean destroy(@PathVariable int id) {
		return gdao.destroy(id);
	}
	@RequestMapping(path = "games/{id}/time", method = RequestMethod.GET)
	public List<Time> showTimeList(@PathVariable int id) {
		// TODO Auto-generated method stub
		return gdao.showTimeList(id);
	}

	public List<Time> tindex() {
		return tdao.index();
	}

	public Time tshow(int id) {
		// TODO Auto-generated method stub
		return tdao.show(id);
	}
	@RequestMapping(path = "games/{gid}/time", method = RequestMethod.POST)
	public Time create(@PathVariable int gid) {
		// TODO Auto-generated method stub
		return tdao.create(gid, new Time(new Date()));
	}

	@RequestMapping(path = "games/{id}/time/{tid}", method = RequestMethod.DELETE)
	public boolean tdestroy(@PathVariable int tid) {
		// TODO Auto-generated method stub
		return false;
	}

	@RequestMapping(path = "games/{id}/time/{tid}", method = RequestMethod.PUT)
	public Time addEndTime(@PathVariable int tid) {
		// TODO Auto-generated method stub
		return tdao.addEndTime(tid);
	}




	

}
