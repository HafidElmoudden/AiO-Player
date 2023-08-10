package main

import (
	"context"
	"fmt"

	youtube "github.com/kkdai/youtube/v2"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show timesssssssss!", name)
}

func (a *App) SearchYoutube(query string) *youtube.Playlist {
	client := &youtube.Client{}

    res, err := client.GetPlaylist("https://www.youtube.com/playlist?list=PL2AuEnYKm_gavKIJjhHfvr_EL7uSNpiKV");
	
	if(err != nil){
		fmt.Println(err);
	} else {
		fmt.Println(res);
	}
	// res, err := client.GetVideo("https://www.youtube.com/watch?v=RSI6EMFKdqw")
	
	// if(err != nil){
	// 	fmt.Println(err);
	// } else {
	// 	fmt.Println(res.Formats);
	// }

	// stream, error := client.GetStreamURL(res, &youtube.Format{})
	// if(error != nil){
	// 	fmt.Println(err);
	// } else {
	// 	fmt.Println(stream);
	// }
	return res
}
