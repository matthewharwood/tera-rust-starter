
use tera::{Context, Tera};
use crate::file_operations::{create_nested_directories, page_content};
use crate::page_data::{Page};
fn contains_index_html(s: &str) -> bool {
    s.contains("index.html")
}
fn get_last_segment(s: &str) -> &str {
    let mut parts: Vec<&str> = s.split('/').collect();
    parts.retain(|&s| !s.is_empty());
    if let Some(last) = parts.last() {
        *last
    } else {
        // Return an empty string or handle the case when there are no segments
        ""
    }
}


fn render_and_write(tera: &Tera, template_name: &str, context: &Context, page: &Page ) {
    match tera.render(template_name, context) {
        Ok(rendered) => {
            if contains_index_html(template_name) {
                let mut parts: Vec<&str> = template_name.split('/').collect();
                parts.insert(0, "dist");
                for part in &mut parts {
                    if *part == "[id]" {
                        *part = get_last_segment(&page.url);
                    }
                }
                let _ = create_nested_directories(".", parts, &rendered);
            }
        }
        Err(err) => eprintln!("Error rendering template {}: {}", template_name, err),
    };
}

pub fn prerender() {
    let tera = match Tera::new("app/**/*.html") {
        Ok(tera) => tera,
        Err(err) => {
            eprintln!("Error initializing Tera: {}", err);
            return;
        }
    };

    let mut context = Context::new();

    let pages_data = match page_content() {
        Ok(data) => data,
        Err(err) => {
            eprintln!("Error reading JSON: {}", err);
            return;
        }
    };
    let template_names: Vec<String> = tera.get_template_names().map(|s| s.to_string()).collect();

    for template_name in &template_names {
        if let Some(page) = pages_data.pages.iter().find(|page| page.template_name == *template_name) {
            context.insert("page", page);
            render_and_write(&tera, template_name, &context, &page);
        } else {
            eprintln!("No matching page found for template: {}", template_name);
        }
    }
}