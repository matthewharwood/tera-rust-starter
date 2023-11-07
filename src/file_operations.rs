
use std::fs;
use std::fs::File;
use std::io::Read;
use crate::page_data::{Pages};

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