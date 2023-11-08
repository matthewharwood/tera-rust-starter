
use std::fs;
use std::fs::File;
use std::io::Read;
use crate::page_data::{Pages};
use std::path::Path;

pub fn create_nested_directories(base_path: &str, directories: Vec<&str>, rendered: &str) -> Result<(), std::io::Error> {
    let mut current_path = String::from(base_path);

    for directory in directories {
        // Append the current directory to the base path
        current_path.push('/');
        current_path.push_str(directory);

        if directory == "index.html" {
            if let Err(err) = std::fs::write(&current_path, rendered) {
                eprintln!("Error writing to file {}: {}", current_path, err);
            } else {
                println!("Rendered content written to {}", current_path);
            }
        } else {
            if !fs::metadata(&current_path).is_ok() {
                fs::create_dir(&current_path)?;
            }
        }

        current_path = current_path.clone();
    }

    Ok(())
}

pub fn page_content() -> Result<Pages, Box<dyn std::error::Error>> {
    let file_path = "_content/pages.json";
    let mut file = File::open(file_path)?;

    let mut json_str = String::new();
    file.read_to_string(&mut json_str)?;

    let text_input: Pages = serde_json::from_str(&json_str)?;
    Ok(text_input)
}

pub fn copy_public_dir() -> Result<(), std::io::Error> {
    let source_dir = "app/_static";
    let destination_dir = "dist/static";

    // Ensure the destination directory exists
    fs::create_dir_all(destination_dir)?;

    // Iterate over the entries in the source directory
    for entry in fs::read_dir(source_dir)? {
        let entry = entry?;
        let entry_path = entry.path();
        let destination_path = Path::new(destination_dir).join(entry.file_name());

        // Copy the entry to the destination directory
        if entry_path.is_file() {
            fs::copy(&entry_path, &destination_path)?;
        } else if entry_path.is_dir() {
            copy_recursive(&entry_path, &destination_path)?;
        }
    }

    Ok(())
}

// Helper function to recursively copy directories
fn copy_recursive(source: &Path, destination: &Path) -> Result<(), std::io::Error> {
    fs::create_dir_all(destination)?;

    for entry in fs::read_dir(source)? {
        let entry = entry?;
        let entry_path = entry.path();
        let destination_path = destination.join(entry.file_name());

        if entry_path.is_file() {
            fs::copy(&entry_path, &destination_path)?;
        } else if entry_path.is_dir() {
            copy_recursive(&entry_path, &destination_path)?;
        }
    }

    Ok(())
}