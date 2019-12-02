package com.codeoftheweb.salvo.controllers;


import com.codeoftheweb.salvo.Models.*;
import com.codeoftheweb.salvo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class SalvoController {

    @Autowired /*Instanciar*/
     GameRepository gameRepository;

    @Autowired
    GamePlayerRepository gamePlayerRepository;

    @Autowired
    PlayerRepository playerRepository;

    @Autowired
    ShipRepository shipRepository;

    @Autowired
    SalvoRepository salvoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping("/games")
    public Map<String, Object> getAllGames(Authentication authentication) {
        Map<String, Object> dto=new LinkedHashMap<>();
        //chequeamos que si hay algun usuario logueado
        Player player = this.getUserAuthenticated(authentication);
        //Validacion
        if (isGuest(authentication)) {
            //caso negativo ingresamos Guest
            dto.put("player", "Guest");
        }else{
            //caso afirmativo lo incluimos al dto(lo que retornamos)
            player = playerRepository.findByEmail(authentication.getName());
            dto.put("player", player.makePlayerDTO());
        }
        //se muestran todos los juegos
        dto.put( "games", gameRepository.findAll().stream().map(game -> game.makeGameDTO()).collect(Collectors.toList()));
        return dto;
    }


    //metodo del tipo POST
    @RequestMapping(path = "/games", method = RequestMethod.POST)
    public ResponseEntity<Object> createGame(Authentication authentication) {
        if (isGuest(authentication)) {
            return new ResponseEntity<>("NO esta autorizado", HttpStatus.UNAUTHORIZED);
        }
        Player  player  = playerRepository.findByEmail(authentication.getName());

        if(player ==  null){
            return new ResponseEntity<>("NO esta autorizado", HttpStatus.UNAUTHORIZED);
        }
        Game game  = gameRepository.save(new Game());
        GamePlayer  gamePlayer  = gamePlayerRepository.save(new GamePlayer(player,game));
        return new ResponseEntity<>(makeMap("gpid",gamePlayer.getId()),HttpStatus.CREATED);
    }


    @RequestMapping("/game_view/{nn}")//M5 Task2 CORREGIR

    public Map<String,Object> getGameViewByGamePlayerID(@PathVariable Long nn/*,Authentication authentication*/){

        GamePlayer gamePlayer = gamePlayerRepository.findById(nn).get();

        Map<String, Object> dto = new LinkedHashMap<>();
        Map<String, Object> hits = new LinkedHashMap<>();

        hits.put("self", new ArrayList<>());
        hits.put("opponent", new ArrayList<>());
        dto.put("id", gamePlayer.getGame().getId());
        dto.put("created", gamePlayer.getGame().getCreationDate());
        dto.put("gameState", "PLACESHIPS");
        dto.put("gamePlayers", gamePlayer.getGame().getGamePlayers()
                .stream()
                .map(gamePlayer1 -> gamePlayer1.makeGamePlayerDTO())
                .collect(Collectors.toList()));

        dto.put("ships",gamePlayer.getShips()
                .stream()
                .map(ship -> ship.makeShipDTO())
                .collect(Collectors.toList()));//devuelve una lista de mapas

        dto.put("salvoes", gamePlayer.getGame().getGamePlayers()
                                                .stream()
                                                .flatMap(gamePlayer1 -> gamePlayer1.getSalvos()
                                                                                    .stream()
                                                                                    .map(salvo -> salvo.makeSalvoDTO()))
                                               .collect(Collectors.toList()));
        dto.put("hits", hits);
        return dto;
    }


    @RequestMapping("/leaderBoard")
    public List<Map<String,Object>> leaderBoard(){
        return playerRepository.findAll()
                                .stream()
                                .map(player -> player.makePlayerScoreDTO())
                                .collect(Collectors.toList());
    }


    @RequestMapping(path = "/players", method = RequestMethod.POST)
    public ResponseEntity<Object> register(
            @RequestParam String email, @RequestParam String password) {

        if (email.isEmpty() || password.isEmpty()) {
            return new ResponseEntity<>("Missing data", HttpStatus.FORBIDDEN);
        }

        if (playerRepository.findByEmail(email) !=  null) {
            return new ResponseEntity<>("Name already in use", HttpStatus.FORBIDDEN);
        }

        playerRepository.save(new Player(email, passwordEncoder.encode(password)));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //Task1 M5 P4
    //En Spring Security, una instancia de la  clase Autenticación contendrá información sobre el usuario actual, incluido el nombre.
    //Metodo para retornar si hay usuario autenticado
    private Player getUserAuthenticated(Authentication authentication){
        Player player=new Player();
        //chequeamos que si hay algun usuario logueado
        if (authentication != null && authentication instanceof AnonymousAuthenticationToken != true) {
            //caso afirmativo lo incluimos al dto
            player = playerRepository.findByEmail(authentication.getName());
        }else{
            //caso negativo ingresamos null
            player = null;
        }
        return player;
    }

    private boolean isGuest(Authentication authentication) {
        return authentication == null || authentication instanceof AnonymousAuthenticationToken;
    }

    //crea un mapa con los datos enviados
    private Map<String, Object> makeMap(String key, Object value) {
        Map<String, Object> map = new HashMap<>();
        map.put(key, value);
        return map;
    }

    //Task2 m5 JoinGame
    @RequestMapping(path = "/game/{gameID}/players", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> joinGame(@PathVariable Long gameID, Authentication authentication) {
        if (isGuest(authentication)){
            return new ResponseEntity<>(makeMap("error", "You can't join a Game if You're Not Logged In!"), HttpStatus.UNAUTHORIZED);
        }

        Player  player  = playerRepository.findByEmail(authentication.getName());
        Game gameToJoin = gameRepository.getOne(gameID);

        if (gameRepository.getOne(gameID) == null) {
            return new ResponseEntity<>(makeMap("error", "No such game."), HttpStatus.FORBIDDEN);
        }

        if(player ==  null){
            return new ResponseEntity<>(makeMap("error", "No such game."), HttpStatus.FORBIDDEN);
        }

        long gamePlayersCount = gameToJoin.getGamePlayers().size();

        if (gamePlayersCount == 1) {
            GamePlayer gameplayer = gamePlayerRepository.save(new GamePlayer(player, gameToJoin));
            return new ResponseEntity<>(makeMap("gpid", gameplayer.getId()), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(makeMap("error", "Game is full!"), HttpStatus.FORBIDDEN);
        }
    }

    //Task3 m5 Guardar posiciones de barcos
    @RequestMapping(value="/games/players/{gpid}/ships", method=RequestMethod.POST)
    public ResponseEntity<Map> addShips(@PathVariable long gpid, @RequestBody List<Ship> ships, Authentication authentication) {
        //Validaciones de jugador
        if(isGuest(authentication)){
            return new ResponseEntity<>(makeMap("error","NO esta autorizado"), HttpStatus.UNAUTHORIZED);
        }
        GamePlayer gamePlayer = gamePlayerRepository.findById(gpid).orElse(null);
        Player  player  = playerRepository.findByEmail(authentication.getName());
        if(player ==  null){
            return new ResponseEntity<>(makeMap("error","NO esta autorizado"), HttpStatus.UNAUTHORIZED);
        }
        if(gamePlayer == null){
            return new ResponseEntity<>(makeMap("error","NO esta autorizado"), HttpStatus.UNAUTHORIZED);
        }
        if(gamePlayer.getPlayer().getId() !=  player.getId()){
            return new ResponseEntity<>(makeMap("error","Los players no coinciden"), HttpStatus.FORBIDDEN);
        }
        //validacion de barcos
        if (!gamePlayer.getShips().isEmpty()){
            return new ResponseEntity<>(makeMap("error", "You have all Ships!"), HttpStatus.FORBIDDEN);
            //prohibicion de cambiar posicion de barcos
        }
        ships.forEach(ship -> {
            ship.setGamePlayer(gamePlayer);
            shipRepository.save(ship);
        });
        return new ResponseEntity<>(makeMap("OK", "Ship Create!"), HttpStatus.CREATED);
    }
    //Task4 m5
    //método de controlador de fondo que pueda recibir un objeto salvo, que consiste en un turno y una lista de ubicaciones
    @RequestMapping(value = "/games/players/{gpid}/salvoes",  method = RequestMethod.POST)
    public ResponseEntity<Map> addSalvo(@PathVariable long gpid, @RequestBody Salvo salvo, Authentication authentication){
        //validaciones de ingreso usuario
        if(isGuest(authentication)){
            return new ResponseEntity<>(makeMap("error","You're NOT authorized"), HttpStatus.UNAUTHORIZED);
        }
        //Asigno si esta logueado
        Player player  = playerRepository.findByEmail(authentication.getName());
        GamePlayer self  = gamePlayerRepository.getOne(gpid);

        //validaciones de player
        if(player ==  null){
            return new ResponseEntity<>(makeMap("error","You're NOT authorized"), HttpStatus.UNAUTHORIZED);
        }
        if(self == null){
            return new ResponseEntity<>(makeMap("error","You're NOT authorized"), HttpStatus.UNAUTHORIZED);
        }
        if(self.getPlayer().getId() !=  player.getId()){
            return new ResponseEntity<>(makeMap("error","The players don't match"), HttpStatus.FORBIDDEN);
        }
        GamePlayer opponent  = self.getGame().getGamePlayers().stream()
                                    .filter(gamePlayer -> gamePlayer.getId()  !=  self.getId())
                                    .findFirst()
                                    .orElse(new GamePlayer());

        if(self.getSalvos().size() <=  opponent.getSalvos().size()){
            salvo.setTurn(self.getSalvos().size()  + 1);
            salvo.setGamePlayer(self);
            salvoRepository.save(salvo);
            return  new ResponseEntity<>(makeMap("OK","Salvo created!!"), HttpStatus.CREATED);
        }
        return  new ResponseEntity<>(makeMap("Error","You can´t play again"), HttpStatus.CREATED);
    }
}
