use serde::{Deserialize, Serialize};
#[derive(Debug, Deserialize, Serialize)]
pub struct TextInput {
    label: String,
    input_type: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Heading {
    text_content: String,
    alt: String,
}
#[derive(Debug, Deserialize, Serialize)]
pub enum PageData {
    TextInput(TextInput),
    Heading(Heading)
}
#[derive(Debug, Deserialize, Serialize)]
pub struct Metadata {
    title: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Page {
    pub(crate) url: String,
    pub(crate) template_name: String,
    metadata: Metadata,
    data: Vec<PageData>
}
#[derive(Debug, Deserialize, Serialize)]
pub struct Pages {
    pub(crate) pages: Vec<Page>
}