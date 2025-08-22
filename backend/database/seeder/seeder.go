package seeder

import (
	"log"

)

// RunSeeders executes all seeders
func RunSeeders() {
	log.Println("Running database seeders...")

	// Run individual seeders
	// seedUsers()
	// Add more seeder functions here

	log.Println("Database seeding completed successfully")
}

