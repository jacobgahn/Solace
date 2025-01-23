# Business Logic

- Is specialty filter AND or OR?

# Backend

- Api Integration Tests
- url params to filter search in getserversideprops
- Fuzzy matching for string searches
- Better error handling
- Authentication
- Containerize
- CRUD advocates
- Db indexing
- Normalize specialties table
- Move to db first db migration approach, update documentation
- Add migration to copy specialties from old table to new table
- Soft Delete, modified timestamps
- Return set of specialties applicable to search response (IF AND filter)

# Frontend

- Page and page size controls
- loading indicator
- filter facets for each searchable field instead of the 'quick search'
- Search filters in url + browser history
- Better data presentation, for example name+degree, phone number formatting
- More subcomponents on AdvocateSearch page
- Frontend Tests (Cypress, etc)
- Add ability to click specialty from an advocate card to add to filters
- searchable multiselect filter facet for specialties
- Make more responsive, mobile friendly
- X button in search box to clear filter instead of "reset search"
- Debounce search boxes (delay auto search until user stops typing) [This currently causes a bit of a bug if you type fast]
- Move filters to collapsible sidebar

# Future improvements

- Advocate pic, rating, testimonials, etc in search card
- Advocate profile page
- AI "find an advocate"
- Advocate profile management
