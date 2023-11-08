mod file_operations;
mod page_data;
mod prerender;
use prerender::prerender;
use crate::file_operations::copy_public_dir;

fn main() {
    prerender();
    match copy_public_dir() {
        Ok(()) => println!("static dir was printed"),
        Err(err) => eprintln!("Error copying directory: {}", err),
    }
}





